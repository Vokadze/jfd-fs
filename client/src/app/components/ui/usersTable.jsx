import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BookMark from "../../components/common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import Profession from "./profession";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    _id,
    ...rest
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },

        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },

        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },

        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },

        rate: { path: "rate", name: "Оценка" },

        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    _id: PropTypes.string
};

export default UsersTable;
