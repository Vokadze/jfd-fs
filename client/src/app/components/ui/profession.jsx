import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
    getProfessionByIds,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionByIds(id));

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading ...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
