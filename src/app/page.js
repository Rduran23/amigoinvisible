import AmigoInvisible from "./components/AmigoInvisible";
import Ads from "./components/Ads";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 to-purple-100">
      <AmigoInvisible/>
      <Ads/>
    </div>
  );
}
