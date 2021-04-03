class SplitString {

  split(movies){
    let abcd=[];
    let movieNameArray
    movies.map((m) => {
      movieNameArray = m.name.split("1080")
      movieNameArray = movieNameArray[0].split("720")
      movieNameArray = movieNameArray[0].split("480")
      movieNameArray = movieNameArray[0].split("360")
      movieNameArray = movieNameArray[0].split("10bit")
      movieNameArray = movieNameArray[0].split("HEVC")
      movieNameArray = movieNameArray[0].split("10bit")
      // console.log(movieNameArray[0]);
      abcd.push({fileid: m.fileid, name: movieNameArray[0]})
      return "";
    })
    return abcd;
  }
}

export default new SplitString();
