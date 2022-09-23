import { BsFillFilePostFill } from "react-icons/bs";
export default {
  name: "product",
  title: "Product",
  icon: BsFillFilePostFill,
  type: "document",
  fieldsets: [{ name: "social", title: "Social media handles" }],
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "image",
      title: "Poster",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 10,
      },
    },
    {
      title: "Отображать на главной?",
      name: "released",
      type: "boolean",
    },
    {
      title: "Отображать на главной раздел бест первіе 4 єлемента ?",
      name: "best",
      type: "boolean",
    },
    // {
    //   name: "comment",
    //   title: "Comment",
    //   type: "array",
    //   of: [{ type: "comments" }],
    // },
    // {
    //   name: "rating",
    //   title: "Rating",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "5 Stars", value: "5-stars" },
    //       { title: "4 Stars", value: "4-stars" },
    //       { title: "3 Stars", value: "3-stars" },
    //       { title: "2 Stars", value: "2-stars" },
    //       { title: "1 Stars", value: "1-stars" },
    //     ],
    //     layout: "radio",
    //   },
    // },
    {
      name: "test",
      title: "Tehnology",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "stat",
      title: "Категория мужские или женские",
      type: "string",
      options: {
        list: [
          { title: "Man", value: "man" },
          { title: "Woman", value: "woman" },
        ],
        layout: "radio",
      },
    },
    // {
    //   name: "teh",
    //   title: "Tehnology",
    //   type: "reference",
    //   to: {
    //     type: "teh",
    //   },
    // },
    {
      name: "brend",
      title: "Brend",
      type: "reference",
      to: {
        type: "brend",
        of: "array",
      },
    },
    // {
    //   name: "category",
    //   title: "Category",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "Pants", value: "Pants" },
    //       { title: "Shirts", value: "Shirts" },
    //     ],
    //     layout: "radio",
    //   },
    // },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: {
        type: "category",
        of: "array",
      },
    },
    // {
    //   name: "rating",
    //   title: "Rating",
    //   type: "number",
    // },

    {
      name: "countInStok",
      title: "Count In Stok",
      type: "number",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
};
