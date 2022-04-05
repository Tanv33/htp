const requiredTemplate = (array) => {
  let template = "";
  array.map(({ field }) => {
    if (field === "last_name") {
      template += `<Row
        gutter={[20, 5]}
        className="input_row"
        justify="space-between"
      >
        <Col xs={24} sm={4} className="flex items-center">
          <label htmlFor="first_name" className="form-label">
            First Name:
          </label>
        </Col>
        <Col sm={20} xs={24}>
          <TextInput
            type="text"
            placeholder="First Name"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
          />
          {submit && formik.errors.first_name && (
            <span className="error">
              {formik.errors.first_name}
            </span>
          )}
        </Col>
      </Row>`;
    }
  });
  //   return JSON.stringify(template);
  return template;
};

module.exports = requiredTemplate;
