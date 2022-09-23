import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import { client, urlFor } from '../utils/client';

const Categ = () => {
    const[cat,setCat] = useState([])
    const query = `*[_type == "category"]{
        ...,
        image{asset->{url}},
    }`;
      const fetchCateg = async () => {
        try {
          const productData = await client.fetch(query);
          setCat(productData);
        } catch (error) {
         console.log(error)
        }
      };

        useEffect(() => {
          fetchCateg();
        }, []);

        console.log("cat", cat);
  return (
    <div className="cat_wrap">
      {cat.map((x) => (
        <Link key={x._id} href={`/search?category=${x.name}`} passHref>
          <div className="cat_item">
            <div className="cat_text_foto">
              <img src={urlFor(x.image)} alt="" />
            </div>
            <div className="cat_text">{x.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Categ