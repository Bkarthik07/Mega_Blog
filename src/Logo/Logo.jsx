import React from 'react';

function Logo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg"
                alt="MegaBlog Logo"
                style={{ height: 40, marginRight: 10 }}
            />
            <span style={{ fontWeight: 'bold', fontSize: 24 }}>MegaBlog</span>
        </div>
    );
}

export default Logo;