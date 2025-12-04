const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// @route   GET /api/movies
// @desc    Get all movies (with optional search/category filters)
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/movies/:id
// @desc    Get single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Movie not found' });
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/movies/seed
// @desc    Seed database with initial data
router.post('/seed', async (req, res) => {
  try {
    const sampleMovies = [
      {
        title: "Stranger Things",
        category: "Web Series",
        genre: "Sci-Fi / Horror",
        year: "2022",
        quality: "WEB-DL",
        size: "1.2 GB",
        rating: "8.7",
        language: "English",
        poster: "[https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=300&h=450](https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=300&h=450)",
        description: "When a young boy vanishes...",
        files: [{ name: "S04E01", size: "150MB", link: "#" }]
      },
      // ... Add more mock data here if needed
    ];
    
    await Movie.deleteMany({});
    await Movie.insertMany(sampleMovies);
    res.json({ msg: "Database Seeded Successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;


