import React, { useEffect, useState } from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getMasterDetailsAsync } from "../../GetMasterDetailRedux/getMasterDetailApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import PencilWhite from "../../../assets/images/PencilWhite.svg";
import pluseWhite from "../../../assets/images/pluseWhite.svg";
import { get } from "../../../utils";
import {
  updateProfileAsync,
  addSkillsAsync,
  getSkillsAsync,
} from "../redux/userProfileApi";
import { Autocomplete } from "../../../components/Chips/Autocomplete";
import { GrayChipItem } from "../../../components/Chips/ChipItem";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import { toast } from "react-toastify";

const Introduction = () => {
  const [editInfo, setEditInfo] = useState(false);
  const handleShowEditInfo = () => setEditInfo(true);
  const handleInfoEdit = () => setEditInfo(false);

  const [editSkill, setEditSkill] = useState(false);
  const handleShowEdit = () => setEditSkill(true);
  const handleSkillEdit = () => setEditSkill(false);
  const dispatch = useDispatch();

  const { masterDetails, refreshMasterDetails, isLoading } = useSelector(
    (state) => state.masterDetails,
    shallowEqual
  );
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const [skills, setSkills] = useState([]);
  const { getSkills, refreshSkills, showSkillLoader, showLoader } = useSelector(
    (state) => state.userProfile,
    shallowEqual
  );
  const [Tags, setTags] = useState([]);
  const [initialTags, setInitialTags] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const callbackFunction = (childData, remove) => {
    if (remove) {
      const value = selectedSkills.filter((res) => res._id !== childData);
      setSelectedSkills(value);
      let tags = Tags.filter((id) => id !== childData);
      setTags(tags);
    } else {
      setSelectedSkills([...selectedSkills, childData[0]]);
      setTags([...Tags, childData[0]._id]);
    }
  };

  useEffect(() => {
    setSelectedSkills(getSkills);
    setInitialTags(getSkills.map((skill) => skill._id));
    setTags(getSkills.map((skill) => skill._id));
  }, [getSkills]);

  // useEffect(() => {
  //   if (refreshMasterDetails) {
  //     dispatch(getMasterDetailsAsync());
  //   }
  // }, [refreshMasterDetails]);

  useEffect(() => {
    let skillList = [];
    if (masterDetails) {
      masterDetails.map((item, index) => {
        if (item.type === "Skills") {
          skillList = item.values.map((res) => ({
            label: res.name,
            name: res.name,
            _id: res._id,
          }));
        }
        setSkills(skillList);
      });
    }
  }, [masterDetails]);

  const initialValues = {
    basicInfo: user.basicInfo || "",
  };

  const BasicInfoSchema = Yup.object().shape({
    basicInfo: Yup.string().trim().required("Basic Info is required"),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: BasicInfoSchema,
    onSubmit: (values) => {
      dispatch(
        updateProfileAsync({
          basicInfo: values.basicInfo,
        })
      );
    },
  });

  const onAddSkills = () => {
    let data = {
      skills: Tags,
    };

    if (
      initialTags.length === Tags.length &&
      initialTags.every((value, index) => value === Tags[index])
    ) {
      return toast.warning("Please update skills");
    }
    dispatch(addSkillsAsync(data, handleSkillEdit));
  };

  useEffect(() => {
    if (refreshSkills) {
      dispatch(getSkillsAsync());
    }
  }, [refreshSkills]);

  return (
    <>
      {isLoading && <SplashScreen />}
      <Container className="bg-white shadowBox radius-top-0">
        <div className="h2 pb-3">Basic Info</div>
        {!editInfo ? (
          <>
            <div className="p3 color_gray pb-3 text-pre-wrap">{formik.values.basicInfo}</div>
            <Button
              variant="blue"
              className="btn-sm"
              onClick={handleShowEditInfo}
            >
              <img src={PencilWhite} alt="edit" className="mr-2 " />
              Edit
            </Button>
          </>
        ) : (
          <>
            <form onSubmit={formik.handleSubmit}>
              <div className="position-relative">
                <textarea
                  rows={3}
                  placeholder="Write on project wall"
                  className="form-control re_input"
                  name="basicInfo"
                  {...formik.getFieldProps("basicInfo")}
                ></textarea>
                {formik.touched.basicInfo && formik.errors.basicInfo ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.basicInfo}
                    </div>
                  </div>
                ) : null}
                <Button
                  type="submit"
                  variant="blue"
                  className="btn-sm px-4 mt-3"
                  disabled={showLoader}
                >
                  {showLoader ? (
                    <>
                      Saving...
                      <img
                        src={LoadingImage}
                        alt="LoadingImage"
                        width="20px"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    "Done"
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="h2 pb-3">Skills</div>
        {!editSkill ? (
          <>
            <div className="d-flex align-items-center flex-wrap pb-2">
              {getSkills &&
                getSkills.length > 0 &&
                getSkills.map((item) => (
                  <div key={item._id} className="re_tag_item color_gray">
                    {item.name}
                  </div>
                ))}
            </div>
            <Button
              type="submit"
              variant="blue"
              className="btn-sm"
              onClick={handleShowEdit}
            >
              <img src={pluseWhite} alt="Add/Edit" className="mr-2" />
              Add/Edit
            </Button>
          </>
        ) : (
          <>
            <div className="d-flex align-items-center flex-wrap pb-3">
              {selectedSkills.map((item, index) => (
                <div key={index}>
                  <GrayChipItem
                    onClick={() => callbackFunction(item._id, true)}
                    item={item.name}
                    close={true}
                  />
                </div>
              ))}
            </div>
            <Row>
              <Col lg="3">
                <Autocomplete
                  placeholder="Search skills"
                  callback={callbackFunction}
                  itemList={skills}
                  selected={selectedSkills}
                />
              </Col>
            </Row>
            <br />
            <br />
            <Button
              type="submit"
              variant="blue"
              onClick={onAddSkills}
              className="btn-sm px-4"
              disabled={showSkillLoader}
            >
              {showSkillLoader ? (
                <>
                  Saving...
                  <img
                    src={LoadingImage}
                    alt="LoadingImage"
                    width="20px"
                    className="ml-2"
                  />
                </>
              ) : (
                "Done"
              )}
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Introduction;
