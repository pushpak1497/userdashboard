import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

const CommentsDashboard = () => {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [page, setPage] = useState(
    () => parseInt(localStorage.getItem("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    () => parseInt(localStorage.getItem("pageSize")) || 10
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then(setComments);
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("pageSize", pageSize);
    localStorage.setItem("search", search);
    localStorage.setItem("sortKey", sortConfig.key);
    localStorage.setItem("sortDir", sortConfig.direction);
  }, [page, pageSize, search, sortConfig]);

  useEffect(() => {
    setSearch(localStorage.getItem("search") || "");
    setSortConfig({
      key: localStorage.getItem("sortKey") || "",
      direction: localStorage.getItem("sortDir") || "",
    });
  }, []);

  const filtered = comments.filter((comment) => {
    return (
      comment.name.toLowerCase().includes(search.toLowerCase()) ||
      comment.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (!key || direction === "") return 0;

    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      let direction = "";
      if (prev.key !== key) direction = "asc";
      else if (prev.direction === "asc") direction = "desc";
      else if (prev.direction === "desc") direction = "";
      else direction = "asc";
      return { key, direction };
    });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="w-4 h-4" />;
    if (sortConfig.direction === "asc") return <ArrowUp className="w-4 h-4" />;
    if (sortConfig.direction === "desc")
      return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-muted px-4 py-6">
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold">
          User Comments Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate("/profile")}>View Profile</Button>
        </div>
      </div>

      <Card className="max-w-7xl mx-auto p-6 rounded-2xl shadow-xl bg-background">
        <CardHeader className="mb-4">
          <CardTitle className="text-xl">Manage Comments</CardTitle>
        </CardHeader>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-96"
          />

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Page Size:</label>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(parseInt(value, 10));
                setPage(1);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Page Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  onClick={() => handleSort("postId")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    Post ID {renderSortIcon("postId")}
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => handleSort("name")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    Name {renderSortIcon("name")}
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => handleSort("email")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    Email {renderSortIcon("email")}
                  </div>
                </TableHead>
                <TableHead>Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>{comment.postId}</TableCell>
                  <TableCell>{comment.name}</TableCell>
                  <TableCell>{comment.email}</TableCell>
                  <TableCell>{comment.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination className="mt-6">
          <PaginationContent className="flex-wrap justify-center gap-2">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <PaginationItem key={pg}>
                <PaginationLink
                  isActive={pg === page}
                  onClick={() => setPage(pg)}
                  className="rounded-full"
                >
                  {pg}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </div>
  );
};

export default CommentsDashboard;
