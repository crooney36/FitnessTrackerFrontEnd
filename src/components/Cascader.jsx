import { Cascader } from "antd";

const cascader = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const onChange = (value) => {
  console.log(value);
};
const App = () => (
  <Cascader
    defaultValue={["zhejiang", "hangzhou", "xihu"]}
    options={options}
    onChange={onChange}
  />
);
export default App;
