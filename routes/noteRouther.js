const express = require('express');
const noteRouther = express.Router();
const Note = require('../models/Note');

bookRouter.get('/:tag', async (req, res) => {
  try {
    const tag = req.params.tag;
    const note = await Note.find({ tags: tag }).lean();

    res.status(200).json({ message: note });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

bookRouter.post('/', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const existingNote = await Note.findOne({ title });
    if (existingNote) {
      return res.status(409).json({ message: 'this note already existed' });
    }
    const createNote = await Note.create({
      title,
      content,
      tags,
    });
    res.status(201).json({ message: createNote });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

bookRouter.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: 'Note Deleted' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

bookRouter.patch('/:id/archive', async (req, res) => {
  try {
    const id = req.params.id;
    const updateNote = await Note.findByIdAndUpdate(
      id,
      { status: 'archived' },
      { new: true }
    );
    if (!updateNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(updateNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookRouter.patch('/:id/archive', async (req, res) => {
  try {
    const id = req.params.id;
    const { tags } = req.body;
    const updateNoteTag = await Note.findByIdAndUpdate(
      id,
      { tags: tags },
      { new: true }
    );
    if (!updateNoteTag) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(updateNoteTag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookRouter.get('/status/:status', async (req, res) => {
  const status = req.params.status;
  const activeOrArchive = await Note.find({ status: status }).lean();

  res.status(200).json({ message: activeOrArchive });
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = noteRouther;
