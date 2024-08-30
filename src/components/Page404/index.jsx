import { useSpeechSynthesis } from "react-speech-kit";

const Page404 = () => {
  //   const { speak } = useSpeechSynthesis();

  //   useEffect(() => {
  //     speak({
  //       text: "This Page is not available. Please say 'go back', to go back",
  //     });
  //   }, []);

  return (
    <h1 className="display-1 text-center my-5">
      404 Page not found - say `go back`
    </h1>
  );
};

export default Page404;
