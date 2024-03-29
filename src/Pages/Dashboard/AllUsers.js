import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import UserRow from "./UserRow";

const AllUsers = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(`https://cycle-gear.onrender.com/user`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div data-aos="zoom-in" data-aos-duration="1000">
      <h2 className="text-3xl text-secondary text-center font-semibold">
        All Users: {users.length}
      </h2>
      <div class="overflow-x-auto">
        <table class="sm:table table-zebra w-full">
          <thead>
            <tr>
              <th>NO.</th>
              <th>User Email</th>
              <th>User Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserRow
                key={user._id}
                user={user}
                index={index}
                refetch={refetch}
              ></UserRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
