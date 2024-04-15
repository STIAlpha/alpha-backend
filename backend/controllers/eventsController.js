const Event = require('../models/Event')
const asyncHandler = require('express-async-handler')
const fs = require('fs')
const imageProcessing = require('../utils/imageProcessing')
const path = require('path')

class EventController {
// CREATE
static createEvent = asyncHandler(async (req, res) => {
        // Get other fields from request body
        const { title, description, rtfContent, eventJoinable, eventEndDate} = req.body;

        const { originalname, buffer, mimetype } = req.file;

        const eventDateCreated = new Date(); // Assuming eventDateCreated is the current date/time
        if (eventDateCreated > new Date(eventEndDate)) {
            return res.status(400).json({ message: 'Event creation date cannot be after the event end date' });
        }
    //    await imageProcessing(req, res); // <-- Here's the addition

            // Initialize eventJoinableValue
        let eventJoinableValue;

        // Check if eventJoinable is an array
        if (Array.isArray(eventJoinable)) {
            // Extract the value of the first element (index 0) from the eventJoinable array
            [eventJoinableValue] = eventJoinable;
        } else {
            // If eventJoinable is not an array, assign its value directly
            eventJoinableValue = eventJoinable;
        }
        
        // Check if event title is a duplicate
        const duplicate = await Event.findOne({ title }).lean().exec();
        if (duplicate) {
            // If a duplicate title is found, delete the uploaded file
            // if (req.processedImage) {
            //     fs.unlinkSync(req.processedImage ? `uploads/${req.processedImage}` : null);
            // }
            return res.status(400).json({ message: 'Duplicate title event' });
        }

       
       
        
        // Create new event in database
        const event = new Event({
            title,
            description,
            rtfContent,
            eventEndDate,
            eventJoinable: eventJoinableValue,
            thumbnail: {
                name: originalname,
                data: buffer,
                contentType: mimetype
            }
        });
        await event.save();

        if (event) {
            res.status(201).json({ message: 'Event created successfully', event });
        } else {
            res.status(400).json({ message: 'Invalid event data received' });
        }
});

 
// READ
static getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();

    if (!events?.length) {
        return res.status(400).json('No events found');
    }

    // Process events to include image data
    const eventsWithImages = events.map(event => {
        return {
            _id: event._id,
            title: event.title,
            description: event.description,
            rtfContent: event.rtfContent,
            eventEndDate: event.eventEndDate,
            eventJoinable: event.eventJoinable,
            // Include image data
            thumbnail: event.thumbnail ? {
                data: event.thumbnail.data.toString('base64'), // Convert Buffer to base64 string
                contentType: event.thumbnail.contentType
            } : null
        };
    });

    res.json(eventsWithImages);
});

// const createEvent = asyncHandler(async (req, res) => {

//     const {title, description, rtfContent, thumbnail} = req.body

//     if(!title || !description || !rtfContent || !thumbnail) {
//         return res.status(400).json('All fields required')
//     }
//     const duplicate = await Event.findOne({title}).lean().exec()

//     if(duplicate) {
//         return res.status(409).json('Duplicate title event')
//     }
//     const eventObject = {title, description, rtfContent, thumbnail}
//     const event = await Event.create(eventObject)

//     if(event) {
//         return res.status(201).json(`Event ${event.title} has been created`)
//     }
//     else {
//         return res.status(400).json('Invalid event data received')
//     }

// })

// UPDATE
static updateEvent = asyncHandler(async (req, res) => {
    const { id, title, description, rtfContent, eventJoinable, eventEndDate } = req.body;

    if (!id || !title || !description || !rtfContent) {
        return res.status(400).json({ message: 'All fields required' });
    }
    let eventJoinableValue;

        // Check if eventJoinable is an array
        if (Array.isArray(eventJoinable)) {
            // Extract the value of the first element (index 0) from the eventJoinable array
            [eventJoinableValue] = eventJoinable;
        } else {
            // If eventJoinable is not an array, assign its value directly
            eventJoinableValue = eventJoinable;
        }

    try {
        // Check if the event exists
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'No event found' });
        }

        // Check for duplicate title
        const duplicate = await Event.findOne({ title }).lean().exec();
        if (duplicate && duplicate._id.toString() !== id) {
            return res.status(409).json({ message: 'Duplicate title event' });
        }

        // Update event fields
        event.title = title;
        event.description = description;
        event.rtfContent = rtfContent;
        event.eventJoinable = eventJoinableValue;
        event.eventEndDate = eventEndDate;

        // If a new thumbnail is provided, update the thumbnail data
        if (req.file) {
            const { originalname, buffer, mimetype } = req.file;
            event.thumbnail = {
                name: originalname,
                data: buffer,
                contentType: mimetype
            };
        }

        const updatedEvent = await event.save();

        res.json({ message: `Event ${updatedEvent.title} updated` });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// DELETE
static deleteEvent = asyncHandler(async (req, res) => {

    const {id} = req.body;

    if(!id) {
        return res.status(400).json({message: 'Event ID required'});
    }

    const event = await Event.findById(id).exec()
    if(!event) {
        return res.status(400).json({message: 'No event found'});
    }

    await event.deleteOne();

    const reply = `Event ${event.title} with ID ${event._id} has been deleted`;
    res.json(reply);
});

static getEventThumbnail = asyncHandler(async (req, res) => {
    try {
        const event = await Event.findById(req.params.id); // Find the event by ID
        if (!event || !event.thumbnail) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.set('Content-Type', event.thumbnail.contentType); // Set the Content-Type header
        res.send(event.thumbnail.data); // Send the image data
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// const updateEventById = asyncHandler(async (req, res) => {
//     const eventId = req.params.id;

//     const event = await Event.findById(eventId).exec()

//     if(!event) {
//         return res.status(400).json({message: 'No event found'})
//     }

//     const { title, description, rtfContent } = req.body;

//     if (!title || !description || !rtfContent) {
//         res.status(400).json({message: 'All fields required'})
//     }
//     const thumbnail = req.file; // Assuming multer middleware handles the file upload

//     try {
//         const event = await Event.findById(eventId).exec();

//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         const duplicate = await Event.findOne({ title }).lean().exec();

//         if (duplicate && duplicate._id.toString() !== eventId) {
//             return res.status(409).json({ message: 'Duplicate title event' });
//         }

//         event.title = title;
//         event.description = description;
//         event.rtfContent = rtfContent;

//         // Update thumbnail only if a new one was provided
//         if (thumbnail) {
//             event.thumbnail = thumbnail.path; // Adjust this based on how multer saves the file
//         }

//         const updatedEvent = await event.save();

//         res.json({ message: `Event ${updatedEvent.title} updated` });
//     } catch (error) {
//         console.error('Error updating event:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// const getEventById = asyncHandler(async (req, res) => {
//     const eventId = req.params.id;

//     const event = await Event.findById(eventId).exec();

//     if (!event) {
//         return res.status(404).json({ message: 'Event not found' });
//     }

//     res.json(event);
// });
}


module.exports = EventController;