/* eslint-disable prettier/prettier */
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';

export const renameImage = (req: Request, file, callback) => {
  const name = file.originalname.split('.')[0];
  const originalName = file.originalname;
  // const randonName = Array(4)
  //   .fill(null)
  //   .map(() => (Math.random() * 16).toString(16))
  //   .join('');
  callback(null, `${originalName}`);
};

export const fileFilter = (req, file, callback) => {
  // if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //   return callback(new Error('invalid format type'), false);
  // }
  return callback(null, true);
};

export const destinationFile = (req: Request, file, callback) => {
  /*
  Este método se encarga de guardar el o los archivos subidos en la ruta
  especificada por la url:
  Ejemplo 1 :en este caso la url es http://localhost:3000/upload/capturas 
  y el file es fotoCasa.jpg el archivo se guardaria en images/capturas/fotoCasa.jpg
  Ejemplo 2: en este caso la url es http://localhost:3000/upload/capturas-casas-manciones
  y el file es fotoCasa.jpg el archivo se guardaria en uploads/capturas/casas/manciones/fotoCasa.jpg
  */

  const route = req.path;
  const newRoute = route.toString().trim().split('/');
  const newRouteT = newRoute[3].toString().trim().split('-');
  const absoluteRoute = newRouteT.join('/');

  if (!existsSync(`./upload/${absoluteRoute}`)) {
    try {
      mkdirSync(`./upload/${absoluteRoute}`, { recursive: true });
    } catch (error) {
      console.log(error);
    }
  }
  return callback(null, `./upload/${absoluteRoute}`);
};

export const proccessRoute = (route: string) => {
  if (route){
    const route1 = route.split('-');
    const absoluteRoute = route1.join('/');
    return `./upload/${absoluteRoute}`;
  }else{
    return `./upload`;
  }
};
