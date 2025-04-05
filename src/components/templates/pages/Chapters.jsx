import React, { useEffect, useState } from "react";
import Table from "../../modules/Table";
import { getChapters } from "../../../utils/services";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IoDocumentOutline } from "react-icons/io5";
import { RxQuestionMark } from "react-icons/rx";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { LuFileAudio2 } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import OrderModal from "./OrderModal";
import { GoTrash } from "react-icons/go";



function Chapters() {
  const { id } = useParams();
  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageNumber: 1,
    bookId: id,
  });
  const [data, setData] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  console.log(id);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: 1,
    }));
  }, []);

  useEffect(() => {
    async function fetchChapters() {
      try {
        setLoading(true);
        setData({ data: [] });

        const chapterResponse = await getChapters({
          pagination,
        });

        if (!chapterResponse) {
          setLoading(false);
        }

        setData(chapterResponse || { data: [] });
      } catch (error) {
        toast.error("Error fetching chapters");
        console.log(error);
        setData({ data: [] });
      } finally {
        setLoading(false);
      }
    }
    fetchChapters();
  }, [pagination]);

  const columns = [{ key: "title", label: "Title" }];

  return (
    <div>
      <Table
        title="Chapters"
        data={data.data}
        setData={setData}
        columns={columns}
        totalData={data.totalCount}
        setPagination={setPagination}
        pagination={pagination}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

export default Chapters;
