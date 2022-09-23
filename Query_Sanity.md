===========================
находит 1 товар по slug и возвращает обект потому что ноль в конце:
*[_type == "product" && slug.current == 'shirt2'][0]

============================================
находит 1 товар по slug и возвращает массив:
*[_type == "product" && slug.current == 'shirt2']

=====================================================
*[_type == "product"] {
      name,image{asset->{url}}
      }

если по ссылке какой то параметр  то можно его вытащить например category

*[_type == "product"] {
      category->{name},name,image{asset->{url}}
      }

================================================================

тут показівается как обединить несколько полей в один блок  в админке

https://www.sanity.io/docs/object-type

Fieldsets


===========================================================

меняю название параметра на другое

*[_type == "product" && slug.current == 'pants1'][0] {
...,
image{asset->{url}},
'category555':category->{name}
      }

==============================
Нашол то что надо!!!1

*[_type == "product" && category1._ref in *[_type=="category1" && name=="Shirts"]._id ]{...}




попробовать *[_type == "product"] | order(publishAt desc) [0..10]