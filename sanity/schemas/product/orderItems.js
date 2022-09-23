export default {
  title: "Order Item",
  name: "orderItem",
  type: "object",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "quantity",
      name: "quantity",
      type: "number",
    },
    // {
    //   title: "image",
    //   name: "image",
    //   type: "string",
    // },
    {
      title: "image",
      name: "image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
    {
      title: "price",
      name: "price",
      type: "number",
    },
  ],
};
