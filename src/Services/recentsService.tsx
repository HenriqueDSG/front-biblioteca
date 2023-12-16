

export class RecentsService {
    recentsSizeFavoritos: number = 3;
    recentsSizeRecents: number = 5;
    constructor() { }
    flatArray(ArrayMenuFullArray: any, arraResult: any[]) {

        ArrayMenuFullArray &&
            ArrayMenuFullArray.map((itemm: any) => {
                if (itemm.children) {
                    this.flatArray(itemm.children, arraResult);
                }
                itemm.children = null;
                arraResult.push(itemm);
            });

        return arraResult;
    }

    async addFavorito(itemRoute: string) {
        // var LiveCloud_Favoritos = localStorage.getItem("LiveCloud_Favoritos");
        // var ArrayFavoritos = JSON.parse(LiveCloud_Favoritos as string);
        // if (!ArrayFavoritos) {
        //     ArrayFavoritos = [];
        // }
        // ArrayFavoritos && ArrayFavoritos.push(itemRoute);

        // localStorage.setItem("LiveCloud_Favoritos", JSON.stringify(ArrayFavoritos.slice(-this.recentsSizeFavoritos)));
        // if (ArrayFavoritos) {
        //  //   let instanceServiceCache = new CacheManagerService({});
        ////     await instanceServiceCache.SaveHistoryPin(ArrayFavoritos);
        // }
    }

    async removeFavorito(itemRoute: string) {
        //var LiveCloud_Favoritos = localStorage.getItem("LiveCloud_Favoritos");
        //var ArrayFavoritos = JSON.parse(LiveCloud_Favoritos as string);
        //if (!ArrayFavoritos) {
        //    ArrayFavoritos = [];
        //}
        //ArrayFavoritos = ArrayFavoritos.filter((x: string) => x != itemRoute);
        //ArrayFavoritos && localStorage.setItem("LiveCloud_Favoritos", JSON.stringify(ArrayFavoritos));

        //  let instanceServiceCache = new CacheManagerService({});
        //   var response = await instanceServiceCache.SaveHistoryPin(ArrayFavoritos);
    }

    retrieveFavoritos() {
        //let resultArrayNew: any[] = [];

        //var LiveCloud_Favoritos = localStorage.getItem("LiveCloud_Favoritos");

        //let ArrayFavoritos = JSON.parse(LiveCloud_Favoritos as string);
        //if (!ArrayFavoritos) {
        //    ArrayFavoritos = [];
        //}
        //var MenuFull = localStorage.getItem("LiveCloud_Menu");
        //let ArrayMenuFull = JSON.parse(MenuFull as string);
        //let ArrayMenuFullFlat: any[] = [];

        //if (ArrayMenuFull) {
        //    let resultArray: any[] = [];
        //    ArrayMenuFullFlat = this.flatArray(ArrayMenuFull, resultArray);
        //}
        //var resultArrayRecentes = [...new Set(ArrayFavoritos)];

        //ArrayFavoritos && resultArrayRecentes.map((recent: any) => {
        //    ArrayMenuFullFlat && ArrayMenuFullFlat.filter(l => recent == (`/${l.route}`)).map((menu) => {
        //        resultArrayNew.push(menu);
        //    });
        //});
        //const key = 'route';

        //let arrayUniqueByKey = [...new Map(resultArrayNew.map(item =>
        //    [item[key], item])).values()];

        //var arraySize = arrayUniqueByKey.length;

        //if (arraySize > this.recentsSizeFavoritos) {
        //    arraySize = this.recentsSizeFavoritos;
        //}
        //this.recentsSizeFavoritos = this.recentsSizeFavoritos - arraySize;
        //arrayUniqueByKey = arrayUniqueByKey.slice(-arraySize).reverse();
        //return arrayUniqueByKey;
    }

    retrieveRecents() {
        //let resultArrayNew: any[] = [];

        //var LiveCloud_Recentes = localStorage.getItem("LiveCloud_Recentes");

        //let ArrayRecentes = JSON.parse(LiveCloud_Recentes as string);
        //if (!ArrayRecentes) {
        //    ArrayRecentes = [];
        //}
        //var MenuFull = localStorage.getItem("LiveCloud_Menu");
        //let ArrayMenuFull = JSON.parse(MenuFull as string);
        //let ArrayMenuFullFlat: any[] = [];

        //if (ArrayMenuFull) {
        //    let resultArray: any[] = [];
        //    ArrayMenuFullFlat = this.flatArray(ArrayMenuFull, resultArray);
        //}
        //var resultArrayRecentes = [...new Set(ArrayRecentes)];

        //ArrayRecentes && resultArrayRecentes.map((recent: any) => {
        //    ArrayMenuFullFlat && ArrayMenuFullFlat.filter(l => recent == (`/${l.route}`)).map((menu) => {
        //        resultArrayNew.push(menu);
        //    });
        //});
        //const key = 'route';

        //let arrayUniqueByKey = [...new Map(resultArrayNew.map(item =>
        //    [item[key], item])).values()];

        //var arraySize = arrayUniqueByKey.length;
        //if (arraySize > this.recentsSizeRecents) {
        //    arraySize = this.recentsSizeRecents;
        //}
        //arrayUniqueByKey = arrayUniqueByKey.slice(-arraySize).reverse();
        //return arrayUniqueByKey;
    }

    async updateRecents(location: any) {
        //var LiveCloud_Recentes = localStorage.getItem("LiveCloud_Recentes");
        //if (!LiveCloud_Recentes) {
        //    LiveCloud_Recentes = "[]";
        //}
        //let ArrayRecentes = [...JSON.parse(LiveCloud_Recentes as string)];

        //ArrayRecentes = ArrayRecentes.filter(x => x != location.pathname);
        //var arrDistinct = [...new Set(ArrayRecentes)];
        //arrDistinct.push(location.pathname);

        //try {

        //    var arrDistinct = [...new Set(arrDistinct)];
        //    var arraySize = arrDistinct.length;
        //    if (arraySize > (this.recentsSizeRecents * 2)) {
        //        arraySize = this.recentsSizeRecents * 2;
        //    }
        //    arrDistinct = arrDistinct.slice(-arraySize);
        //    let resutJson = JSON.stringify(arrDistinct);
        //    localStorage.setItem("LiveCloud_Recentes", resutJson);
        //    if (arrDistinct.length > 1) {
        //     //   let instanceServiceCache = new CacheManagerService({});
        //       // var response = await instanceServiceCache.SaveHistoryRecent(arrDistinct);
        //    }
        //} catch (e) {

        //}
    }
}