import Logo from './Logo';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-400 mt-4">
              Advanced network intrusion detection powered by machine learning.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-cyberpulse-purple">Home</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-cyberpulse-purple">Dashboard</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-cyberpulse-purple">About</a></li>
              <li><a href="/feedback" className="text-gray-400 hover:text-cyberpulse-purple">Feedback</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} className="text-cyberpulse-purple" />
                <span>123 Security Ave, Cybertown</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={18} className="text-cyberpulse-purple" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={18} className="text-cyberpulse-purple" />
                <span>info@cyberpulse.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Cyber-Pulse. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-cyberpulse-purple">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-cyberpulse-purple">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
