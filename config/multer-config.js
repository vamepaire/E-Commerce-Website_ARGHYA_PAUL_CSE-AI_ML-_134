const multer = require('multer');
const express = require('express');
const mongoose = require('mongoose');

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;