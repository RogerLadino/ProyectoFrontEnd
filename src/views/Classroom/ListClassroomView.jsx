import React, { useState, useEffect } from "react";
import TeacherClassroomView from "./TeacherClassroomView";
import StudentClassroomView from "./StudentClassroomView";
import { getUserProfile } from "../../services/user.service";

export default function ListClassroomView() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserProfile()

      setUser(response)
    }

    fetchUser()
  }, [])

  return (
    <>
      {user.appRoleId == 1 ? <TeacherClassroomView /> : <StudentClassroomView />}
    </>
  )
}
