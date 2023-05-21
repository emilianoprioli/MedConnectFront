"use client";

import Cards_Especialidades_Display from "../components/Cards_Especialidades_Display";
import { useDispatch, useSelector } from "react-redux";
import { getSpeciality } from "../redux/reducer";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "../components/Search_Bar_Especialidades";

export default function Especialidades() {
  const dispatch = useDispatch();
  const especialidades = useSelector((state) => state.speciality.AllSpecial);

  const [currentEsp, setCurrentEsp] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);
  const [especialidad, setEspecialidad] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3001/specializations");

      dispatch(getSpeciality(response.data));
    } catch (error) {
      alert(error.message);
    }
  }

  const next = () => {
    if (especialidad.length < data.length) {
      setCurrentEsp(currentEsp + 4);
      setEspecialidad(data.slice(0, especialidad.length + 4));
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(especialidades);
  }, [especialidades]);

  useEffect(() => {
    setEspecialidad(data.slice(0, currentEsp + 4));
  }, [data]);

  return (
    <div>
      <div className="w-full">
        <h1 className="text-5xl">ESPECIALIDADES</h1>
        <SearchBar />
      </div>

      <div>
        <Cards_Especialidades_Display especialidad={especialidad} />
      </div>
      <div className="m-auto mt-20 h-96 max-w-4xl overflow-auto">
        <InfiniteScroll
          dataLength={especialidad.length}
          next={() => setTimeout(next, 250)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<h4>NO HAY MAS INFO</h4>}
          // scrollableTarget="scrollableDiv"
        />
      </div>
    </div>
  );
}
