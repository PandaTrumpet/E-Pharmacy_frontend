import MainBaner from "../../components/MainBaner/MainBaner";
import PharmacyPromoSection from "../../components/PharmacyPromoSection/PharmacyPromoSection.tsx";
import PromoBanners from "../../components/PromoBanners/PromoBanners.tsx";
import Reviews from "../../components/Reviews/Reviews.tsx";
const HomePage = () => {
  return (
    <div>
      <MainBaner />
      <PromoBanners />
      <PharmacyPromoSection />
      <Reviews />
    </div>
  );
};

export default HomePage;
