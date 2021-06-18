export default class Utilidade {
    static default: any;

    static async conversorImagemEmBase64(arquivo: File) {
        const reader = new FileReader();
        reader.readAsBinaryString(arquivo);
        const retorno = await new Promise((resolve, reject) => {
          reader.onload = (event) => {
            resolve(btoa((reader.result as string)));
          };
        });
        return retorno;
    }


    static handleReaderLoaded(e: any) {
        return btoa(e.target.result);
    }

    static gerarFormData(object: any): FormData {
        const formData: FormData = new FormData();
        for (const property in object) {
            if (!object.hasOwnProperty(property) || !object[property]) {
                continue;
            }
            else {
                if (object[property] instanceof Array) {
                    object[property].forEach((element: any) => {
                        formData.append('fotos', element);
                    });
                } else {
                    formData.append(property, object[property]);
                }
            }
        }
        return formData;
    }

}
