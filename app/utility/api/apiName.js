export default {
  create_kyc: 'create-kyc/',
  create_video_kyc:'create-video-kyc/',
  register: 'register',
  create_signature:'create-signature/',
  create_mer_form:'create-mer-form/',



  getEmployerContributionData: (
    employeeId,
    employee_contribution,
    activation_date,
  ) =>
    `employee/${employeeId}/employer-contribution?employee_contribution=${employee_contribution}&activation_date=${activation_date}`,

  getSmartLightboxData: (userId, pension_account_id) =>
    `employee/smart-lightbox-data/${userId}/?pension_account_id=${pension_account_id}`,

  getNewEmployeeSavingRate: (userId, newSavingRate, pension_account_id) =>
    `employee/small-steps-data/${userId}/?new_employee_savings_rate=${newSavingRate}&pension_account_id=${pension_account_id}`,

  getLightboxTwoData: (userId, pension_account_id) =>
    `employee/light-box-2/${userId}/?pension_account_id=${pension_account_id}`,
};
