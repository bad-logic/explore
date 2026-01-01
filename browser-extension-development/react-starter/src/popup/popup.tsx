import React from 'react';
import { createRoot } from 'react-dom/client';

import './popup.css';

const Test = () => <img src="icon.png" />;

const root = document.createElement('div');
root.id = 'root';
document.body.append(root);

createRoot(root).render(<Test />);
