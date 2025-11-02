import Product1 from "../icons/product1.webp";
import Product2 from "../icons/product2.webp";
import Product3 from "../icons/product3.webp";
import Product4 from "../icons/product4.webp";

const Toolbar = () => {
  return (
    <section className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block p-1 bg-white shadow-[0px_6px_12px_0px_#5C738314,0px_4px_8px_0px_#5C738314] rounded-full">
      <div className="space-y-2">
        <div className="p-2">
          <img
            src={Product1}
            alt="Product1"
            className="size-6 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out cursor-pointer"
          />
        </div>

        <div className="p-2">
          <img
            src={Product2}
            alt="Product2"
            className="size-6 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out cursor-pointer"
          />
        </div>

        <div className="p-2">
          <img
            src={Product3}
            alt="Product3"
            className="size-6 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out cursor-pointer"
          />
        </div>

        <div className="p-2">
          <img
            src={Product4}
            alt="Product4"
            className="size-6 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default Toolbar;
