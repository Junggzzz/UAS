export default function Footer() {
    return (
      <footer className="bg-white text-black py-16 px-8 md:px-20 lg:px-32 font-poppins">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Furniro.</h2>
            <p className="text-sm text-gray-500">
              400 University Drive Suite 200 Coral Gables, <br />
              FL 33134 USA
            </p>
          </div>
  
          {/* Links */}
          <div>
            <h3 className="text-sm text-gray-400 mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/shoppage" className="hover:underline">Shop</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
  
          {/* Help */}
          <div>
            <h3 className="text-sm text-gray-400 mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Payment Options</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
              <li><a href="#" className="hover:underline">Privacy Policies</a></li>
            </ul>
          </div>
  
          {/* Newsletter */}
          <div>
            <h3 className="text-sm text-gray-400 mb-4">Newsletter</h3>
            <div className="flex items-center border-b border-gray-400 pb-1">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="w-full text-sm placeholder-gray-400 outline-none bg-transparent"
              />
              <button className="text-sm font-semibold ml-2">SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  