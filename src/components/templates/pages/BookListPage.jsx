import toast from "react-hot-toast";
import { getAllBooks } from "../../../utils/services";
import Table from "../../modules/Table";
import { useEffect, useState } from "react";
import IsFree from "../../modules/books-list/IsFree";
import SearchAny from "../../modules/books-list/SearchAny";
import MultiFilter from "../../modules/books-list/MultiFilter";

function BookListPage() {
  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageNumber: 1,
    category: "",
    title: "",
    isOffer: null,
  });
  const [data, setData] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  const [detailRow, setDetailRow] = useState(false);
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: 1,
    }));
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        setData({ data: [] });

        const bookResponse = await getAllBooks({
          pagination,
        });

        if (!bookResponse) {
          setLoading(false);
        }

        setData(bookResponse || { data: [] });
      } catch (error) {
        toast.error("Error fetching books");
        console.log(error);
        setData({ data: [] });
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [pagination]);

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
  ];

  const filters = (
    <>
      <div>
        <MultiFilter setPagination={setPagination} pagination={pagination} />
        <SearchAny setPagination={setPagination} pagination={pagination} />
      </div>
      <div>
        <IsFree setPagination={setPagination} pagination={pagination} />
      </div>
    </>
  );

  return (
    <div>
      <Table
        title="Books List"
        data={data.data}
        setData={setData}
        columns={columns}
        totalData={data.totalCount}
        setPagination={setPagination}
        pagination={pagination}
        loading={loading}
        setLoading={setLoading}
        detailRow={detailRow}
        setDetailRow={setDetailRow}
        customHeaderContent={filters}
      />
    </div>
  );
}

export default BookListPage;
