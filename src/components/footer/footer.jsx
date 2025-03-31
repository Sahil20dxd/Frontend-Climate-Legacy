import './footer.css'
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Footer(){
    return(
        <footer>
            <div class="footer-container">
                <div class="footer-left">
                <h3>Climate Legacy</h3>
                <p>Empowering you to track and reduce your carbon footprint.</p>
                </div>
                <div class="footer-right" id="contact">
                <h4>Contact Us</h4>
                <p>Email: heather@climate-legacy.com</p>
                </div>
                <div class="footer-bottom">
                <p>&copy; 2025 Climate Legacy. All rights reserved.</p>
                <p>
                    <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                </p>
                </div>
            </div>
        </footer>
    )
}