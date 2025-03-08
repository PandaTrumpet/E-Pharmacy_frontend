import MainBaner from "../../components/MainBaner/MainBaner";
import PharmacyPromoSection from "../../components/PharmacyPromoSection/PharmacyPromoSection.tsx";
import Reviews from "../../components/Reviews/Reviews.tsx";
const HomePage = () => {
  return (
    <div>
      <MainBaner />
      <PharmacyPromoSection />
      <Reviews />
    </div>
  );
};

export default HomePage;
