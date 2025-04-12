import React from 'react';
import "./Footer.component.css";

// Footer component wordt onderaan elke pagina getoond
function Footer() {
    return (
        <footer className="footer">
            {/* tekst die aan de gebruiker wordt getoond */}
            <p>
                "Football without fans is nothing." En daar geloven wij ook in.
                Want of je nu op de tribune zit, in de trein, of op vakantie bent —
                met onze applicatie volg je jouw favoriete club altijd en overal."
            </p>
        </footer>
    );
}

export default Footer;
