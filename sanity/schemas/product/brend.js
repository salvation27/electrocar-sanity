import { MdOutlineTune } from "react-icons/md";

export default {
  name: "brend",
  title: "Brend->Products",
  type: "document",
  icon: MdOutlineTune,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
