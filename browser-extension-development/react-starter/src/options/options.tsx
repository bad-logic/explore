import React from 'react';
import { createRoot } from 'react-dom/client';

import './options.css';

const Options = () => <p>Options</p>;

const root = document.createElement('div');
root.id = 'root';
document.body.append(root);

createRoot(root).render(<Options />);
