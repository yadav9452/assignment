import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await fetch("https://universitydashboard-1.onrender.com/admin/studentList");
      if (!response.ok) {
        throw new Error("Failed to fetch student list");
      }
      const data = await response.json();
      console.log(data)
      setStudents(data);
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
            <Th>Password</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student._id}>
              <Td>{student.name}</Td>
              <Td>{student.email}</Td>
              <Td>{student.password}</Td>
              {/* <Td>{student.role}</Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default StudentList;
