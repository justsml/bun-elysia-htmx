export interface IMovie {
  id?: number;
  title: string;
  year: number;
}

const data: IMovie[] = [
  { title: "Inception", year: 2010 },
  { title: "The dark Knight", year: 2009 },
  { title: "Interstellar", year: 2014 },
];

export const MovieApi = {
  create: (newMovie: unknown) => {
    if (typeof newMovie !== "object") throw new Error("Invalid movie");
    const movie = newMovie as IMovie;
    data.push({...movie, id: data.length});
    return movie;
  },
  readAll: () => data,
  read: (id: number) => data[id],
  update: (id: number, movie: unknown) => {
    if (typeof movie !== "object") throw new Error("Invalid movie");
    data[id] = { ...data[id], ...movie };
    return data[id];
  },
  remove: (id: number) => {
    data.splice(id, 1);
  },
};
