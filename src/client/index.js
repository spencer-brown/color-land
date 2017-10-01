// This file is the client-side entrypoint.
// --------------------------------------------

import React from 'react';
import { render } from 'react-dom';

import App from './components/App.js';

// Render the app.
render(<App/>, document.getElementById('react-container'));