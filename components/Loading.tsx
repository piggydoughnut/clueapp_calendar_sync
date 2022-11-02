import { Puff } from "react-loader-spinner";

const Loading = () => (
  <Puff
    height="50"
    width="50"
    radius={1}
    color="#ec5fda"
    ariaLabel="puff-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
);

export default Loading;
