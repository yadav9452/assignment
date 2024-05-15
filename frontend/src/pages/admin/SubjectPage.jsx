import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";

const SubjectPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await fetch(
        "https://universitydashboard-1.onrender.com/admin/studentlist"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student list");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    // Handle edit action, you can navigate to an edit page or open a modal
    console.log("Edit student with ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://universitydashboard.onrender.com/admin/studentlist/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      // Remove deleted student from the state
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMarks = async (id) => {
    try {
      const response = await fetch(
        `https://universitydashboard.onrender.com/admin/marks/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch marks");
      }
      const marksData = await response.json();
      // Handle marks data
      console.log("Marks for student with ID", id, marksData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="container">
      <Table className="table" id="makeEditable">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Stream</Th>
            <Th>Subject</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
            <Th>Fetch Marks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student._id}>
              <Td>{student.name}</Td>
              <Td>{student.email}</Td>
              <Td>{student.stream ? student.stream.name : "-"}</Td>
              <Td>{student.subject ? student.subject.name : "-"}</Td>
              <Td>
                <IconButton
                  icon={<HiOutlinePencil />}
                  onClick={() => handleEdit(student._id)}
                />
              </Td>
              <Td>
                <IconButton
                  icon={<MdDelete />}
                  onClick={() => handleDelete(student._id)}
                />
              </Td>
              <Td>
                <IconButton
                  icon={<FiEdit2 />}
                  onClick={() => fetchMarks(student._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SubjectPage;
