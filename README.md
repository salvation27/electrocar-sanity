
https://www.youtube.com/watch?v=FcRWgWQale4&t=6461s

-Вращающийся спинер при получении данніх с Sanity
1)Компонент Layout хедер разній
2)Установка Sanity
   2.1)в корне  пишем команду
       npm install -g @sanity/cli
      sanity init --coupon javascriptmastery2022
      (название и всякая трибуха выбираем)
   2.2)Для добавления в админке иконку надо установить плагин в корне админки 
     и потом ипортировать его в нужную схему.Потом вставить его:
       icon: BsFillFilePostFill,

   2.3)для получения данніх с админки надо установить в реакт
      "@sanity/client": "^3.0.6",
      "@sanity/image-url": "^1.0.1",
      2.3.1)Создать папку отдельную с подключением к Sanity

3)Страница подробно v1.3 в гиите
4)создаем контекст и стор :utils/store.js  и оборачиваем все приложение  _app.js
   4.1)достаем диспатч и стейт   из контекста 
      const {state,dispatch} = useContext(Store)
5)смена темі (1.45)
6)добавление товара в корзину
6.1)делаем в store переменную
6ю2)создаем ф. для кнопки
6.3) делаем в апи в next
7)useForm
8)Регистрация через санити 2ю37






4.08
      

   заметки - добавление в корзину кнопка добавить  на странице подробно тот же редусьер что и на странице корзина обновить колличество



ьуь сдайдер для страниці товара подробно
   https://www.youtube.com/watch?v=-VKXgsrLEjw


   https://react-slick.neostack.com/docs/api/

   !!!!
   Реализация если вошол в кабинет кидает на нужную страницу если нет кидает на страницу входа 

   как сделано: 1) кнопка "Checkout" в корзине на ней клик

     onClick={() => {
        router.push("/shipping");
     }}
2)к компоненте shipping Юз єффект проверяет есть ли пользователь если нет редирект на стр логин

  useEffect(() => {
    if (!userInfo) {
      enqueueSnackbar(`You need login first`, { variant: "error" });
      return router.push("/login?redirect=/shipping");
    }

  }, []);

  3) специально указан адресс "/login?redirect=/shipping"
router.push("/login?redirect=/shipping")

4) достаем из адр. строки   /login?redirect=/shipping
 const { redirect } = router.query;

 и устанавливаем при входе в аккаунт 

 
