import { FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer max-width-container">
      <div className="footer-top">
        <div className="footer-address">
          <h4>IT Group</h4>
          <p>C. Salvador de Madariaga, 1</p>
          <p>28027 Madrid</p>
          <p>Spain</p>
        </div>

        <div className="footer-social">
          <span>Follow us on</span>
          <div className="icons">
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2022 IT Hotels. All rights reserved.</p>
        <p>
          Photos by <u>Felix Mooneeram</u> &amp; <u>Serge Kutuzov</u> on <u>Unsplash</u>
        </p>
      </div>
    </footer>
  );
}
