const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Customised fucntions to manually check information that is not available via supabase in-built
// provides manual integrity checks of current users and other functions

async function checkEmailExists(email) {
  const { data, error } = await supabase.from('Users').select('email').eq('email', email);
  if (error) {
    throw error;
  }
  if (data.length > 0) {
    return true;
  } else {
    return false;
  }
}

async function signUp(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to sign up user.' });
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function signOut(req, res) {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    res.json({ message: 'User signed out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to sign out user.' });
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = supabase.auth.user();
    if (!user) {
      throw new Error('User not authenticated');
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get current user.' });
  }
}

router.post('/signup', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], signUp);

router.post('/signin', signIn);

router.post('/signout', signOut);

router.get('/me', getCurrentUser);

module.exports = router;
 