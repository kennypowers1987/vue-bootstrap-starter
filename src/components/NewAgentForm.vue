<template>
  <div class="container card">
    <b-form @submit="onSubmit">
      <b-form-group id="guidInputGroup" label="guid" label-for="guidInput">
        <b-form-input id="guidInput" v-model="form.guid" type="text" required placeholder="Enter guid"></b-form-input>
      </b-form-group>
      <b-form-group id="userTypeIDGroup" label="User Type ID" label-for="userTypeIDInput">
        <b-form-input id="userTypeIDInput" v-model="form.userTypeID" type="number" required placeholder="User Type ID"></b-form-input>
      </b-form-group>
      <b-form-group id="userTypeIDGroup" label="Title ID" label-for="titleIDInput">
        <b-form-input id="titleIDInput" v-model="form.titleID" type="number" required placeholder="Title ID"></b-form-input>
      </b-form-group>
      <b-form-group id="userNumberGroup" label="User Number" label-for="userNumberInput">
        <b-form-input id="userNumberInput" v-model="form.userNumber" type="text" required placeholder="User number"></b-form-input>
      </b-form-group>
      <b-form-group id="nameInputGroup" label="Agent Name" label-for="nameInput">
        <b-form-input id="nameInput" v-model="form.name" type="text" required placeholder="Agent name"></b-form-input>
      </b-form-group>
      <b-form-group id="companyNameInputGroup" label="Company Name" label-for="companyNameInput">
        <b-form-input id="companyNameInput" type="text" v-model="form.companyName" required placeholder="Company Name"></b-form-input>
      </b-form-group>
      <b-form-group id="passwordInputGroup" label="Password" label-for="passwordInput">
        <b-form-input id="passwordInput" type="password" v-model="form.password" required placeholder="Password"></b-form-input>
      </b-form-group>
      <b-form-group id="mobileInputGroup" label="Mobile Number" label-for="mobileInput">
        <b-form-input id="mobileInput" type="tel" v-model="form.mobile" required placeholder="Mobile Number"></b-form-input>
      </b-form-group>
      <b-form-group id="emailInputGroup" label="Email" label-for="emailInput">
        <b-form-input id="emailInput" type="email" v-model="form.email" required placeholder="Email"></b-form-input>
      </b-form-group>
      <b-form-group id="idxUrlInputGroup" label="idxUrl" label-for="idxUrlInput">
        <b-form-input id="idxUrlInput" type="text" v-model="form.idxUrl" required placeholder="idxUrl"></b-form-input>
      </b-form-group>
      <b-form-group id="parentUserIDInputGroup" label="Parent User ID" label-for="parentUserIDInput">
        <b-form-input id="parentUserIDInput" type="number" v-model="form.parentUserID" required placeholder="Parent User ID"></b-form-input>
      </b-form-group>
      <b-form-group id="addressInputGroup" label="Address" label-for="addressInput">
        <b-form-input id="addressInput" type="text" v-model="form.address" required placeholder="Address"></b-form-input>
      </b-form-group>
      <b-form-group id="stateIDInputGroup" label="State ID" label-for="stateIDInput">
        <b-form-input id="stateIDInput" type="text" v-model="form.stateID" required placeholder="State ID"></b-form-input>
      </b-form-group>
      <b-form-group id="cityIDInputGroup" label="City ID" label-for="cityIDInput">
        <b-form-input id="cityIDInput" type="text" v-model="form.cityID" required placeholder="City ID"></b-form-input>
      </b-form-group>
      <b-form-group id="zipCodeInputGroup" label="Zip Code" label-for="zipCodeInput">
        <b-form-input id="zipCodeInput" type="text" v-model="form.zipCode" required placeholder="Zip Code"></b-form-input>
      </b-form-group>
      <b-form-group id="firstNameInputGroup" label="First Name" label-for="firstNameInput">
        <b-form-input id="firstNameInput" type="text" v-model="form.firstName" required placeholder="First Name"></b-form-input>
      </b-form-group>
      <b-form-group id="lastNameInputGroup" label="Last Name" label-for="lastNameInput">
        <b-form-input id="lastNameInput" type="text" v-model="form.lastName" required placeholder="Last Name"></b-form-input>
      </b-form-group>
      <b-form-group id="weightageInputGroup" label="Weightage" label-for="weightageInput">
        <b-form-input id="weightageInput" type="number" v-model="form.weightage" required placeholder="Weightage"></b-form-input>
      </b-form-group>
      <b-form-group id="partnerExternalIDGroup" label="Partner External ID" label-for="partnerExternalInput">
        <b-form-input id="partnerExternalInput" type="text" v-model="form.partnerExternalId" required placeholder="Partner External ID"></b-form-input>
      </b-form-group>
      <b-form-group id="cityInputGroup" label="City" label-for="cityInput">
        <b-form-input id="cityInput" type="text" v-model="form.city" required placeholder="City"></b-form-input>
      </b-form-group>
      <b-form-group id="stateInputGroup" label="State" label-for="stateInput">
        <b-form-input id="stateInput" type="text" v-model="form.state" required placeholder="State"></b-form-input>
      </b-form-group>
      <b-form-group id="countryInputGroup" label="Country" label-for="countryInput">
        <b-form-input id="countryInput" type="text" v-model="form.country" required placeholder="Country"></b-form-input>
      </b-form-group>
      <b-form-group id="faxInputGroup" label="Country" label-for="faxInput">
        <b-form-input id="faxInput" type="text" v-model="form.fax" required placeholder="Fax"></b-form-input>
      </b-form-group>
      <b-form-group id="websiteInputGroup" label="Website" label-for="websiteInput">
        <b-form-input id="websiteInput" type="url" v-model="form.website" required placeholder="Website"></b-form-input>
      </b-form-group>
      <b-form-group id="brokerLicenseNumberInputGroup" label="Broker License Number" label-for="brokerLicenseNumberInput">
        <b-form-input id="brokerLicenseNumber" type="text" v-model="form.broker_License_Number__c" required placeholder="Broker License Number"></b-form-input>
      </b-form-group>
      <b-form-group id="privacyPolicyUpdateGroup" label="Privacy Policy Update" label-for="privacyPolicyUpdateInput">
        <b-form-input id="privacyPolicyUpdateInput" type="text" v-model="form.privacy_Policy_Update__c" required placeholder="Privacy Policy Update"></b-form-input>
      </b-form-group>
      <b-form-group id="externalId" label="External ID" label-for="externalIDInput">
        <b-form-input id="externalIDInput" type="text" v-model="form.external_Id__c" required placeholder="External ID"></b-form-input>
      </b-form-group>
      <b-form-group id="billingStreetInputGroup" label="Billing Street" label-for="billingStreetInput">
        <b-form-input id="billingStreetInput" type="text" v-model="form.billingStreet" required placeholder="Billing Street"></b-form-input>
      </b-form-group>
      <b-form-group id="billingCityInputGroup" label="Billing City" label-for="billingCityInput">
        <b-form-input id="billingCityInput" type="text" v-model="form.billingCity" required placeholder="Billing City"></b-form-input>
      </b-form-group>
      <b-form-group id="billingStateInputGroup" label="Billing State" label-for="billingStateInput">
        <b-form-input id="billingStateInput" type="text" v-model="form.billingState" required placeholder="Billing State"></b-form-input>
      </b-form-group>
      <b-form-group id="billingPostalCodeInputGroup" label="Billing Postal Code" label-for="billingPostalCodeInput">
        <b-form-input id="billingPostalCodeInput" type="text" v-model="form.billingPostalCode" required placeholder="Billing Postal Code"></b-form-input>
      </b-form-group>
      <b-form-group id="billingCountryInputGroup" label="Billing Country" label-for="billingCountryInput">
        <b-form-input id="billingCountryInput" type="text" v-model="form.billingCountry" required placeholder="Billing Country"></b-form-input>
      </b-form-group>
      <b-form-group id="descriptionInputGroup" label="Description" label-for="descriptionInput">
        <b-form-input id="descriptionInput" type="text" v-model="form.description" required placeholder="Description"></b-form-input>
      </b-form-group>
      <b-form-group id="serviceAreasInputGroup" label="Service Areas" label-for="serviceAreasInput">
        <b-form-input id="serviceAreasInput" type="text" v-model="form.service_Areas__c" required placeholder="Service Areas"></b-form-input>
      </b-form-group>
      <b-form-group id="statesInputGroup" label="States" label-for="statesInput">
        <b-form-input id="statesInput" type="text" v-model="form.states__c" required placeholder="States"></b-form-input>
      </b-form-group>
      <b-form-group id="licenseNumberInputGroup" label="License Number" label-for="licenseNumberInput">
        <b-form-input id="licenseNumberInput" type="text" v-model="form.license_Number__c" required placeholder="License Number"></b-form-input>
      </b-form-group>
      <b-form-group id="licenseNumberInputGroup" label="License Number" label-for="licenseNumberInput">
        <b-form-input id="licenseNumberInput" type="text" v-model="form.license_Number__c" required placeholder="License Number"></b-form-input>
      </b-form-group>
      <b-form-group id="idx_UrlInputGroup" label="idx URL" label-for="idx_UrlInput">
        <b-form-input id="idx_UrlInput" type="text" v-model="form.idX_URL__c" required placeholder="idx URL"></b-form-input>
      </b-form-group>
      <b-form-group id="spriteUsernameInputGroup" label="Sprite RE Username" label-for="spriteREUsernameInput">
        <b-form-input id="spriteREUsernameInput" type="text" v-model="form.spriteRE_Username__c" required placeholder="Sprite RE Username"></b-form-input>
      </b-form-group>
      <b-form-group id="mailingStreetInputGroup" label="Mailing Street" label-for="mailingStreetInput">
        <b-form-input id="mailingStreetInput" type="text" v-model="form.mailingStreet" required placeholder="Mailing Street"></b-form-input>
      </b-form-group>
      <b-form-group id="mailingCityInputGroup" label="Mailing City" label-for="mailingCityInput">
        <b-form-input id="mailingCityInput" type="text" v-model="form.mailingCity" required placeholder="Mailing City"></b-form-input>
      </b-form-group>
      <b-form-group id="mailingStateInputGroup" label="mMiling State" label-for="mailingStateInput">
        <b-form-input id="mailingStateInput" type="text" v-model="form.mailingState" required placeholder="Mailing State"></b-form-input>
      </b-form-group>
      <b-form-group id="mailingPostalCodeInputGroup" label="Mailing Postal Code" label-for="mailingPostalCodeInput">
        <b-form-input id="mailingPostalCodeInput" type="text" v-model="form.mailingPostalCode" required placeholder="Mailing Postal Code"></b-form-input>
      </b-form-group>
      <b-form-group id="mailingCountryInputGroup" label="Mailing Country" label-for="mailingCountryInput">
        <b-form-input id="mailingCountryInput" type="text" v-model="form.mailingCountry" required placeholder="Mailing Country"></b-form-input>
      </b-form-group>
      <b-form-group id="service_Area_InputGroup1" label="Service Area 1" label-for="service_Area_Input1">
        <b-form-input id="service_Area_Input1" type="text" v-model="form.service_Area_1__c" required placeholder="Service Area 1"></b-form-input>
      </b-form-group>
      <b-form-group id="stateInputGroup1" label="State 1" label-for="stateInput1">
        <b-form-input id="stateInput1" type="text" v-model="form.state_1__c" required placeholder="State 1"></b-form-input>
      </b-form-group>
      <b-form-group id="service_Area_InputGroup2" label="Service Area 1" label-for="service_Area_Input2">
        <b-form-input id="service_Area_Input2" type="text" v-model="form.service_Area_2__c" required placeholder="Service Area 2"></b-form-input>
      </b-form-group>
      <b-form-group id="stateInputGroup2" label="State 2" label-for="stateInput1">
        <b-form-input id="stateInput2" type="text" v-model="form.state_2__c" required placeholder="State 2"></b-form-input>
      </b-form-group>
      <b-form-group id="service_Area_InputGroup3" label="Service Area 3" label-for="service_Area_Input3">
        <b-form-input id="service_Area_Input3" type="text" v-model="form.service_Area_3__c" required placeholder="Service Area 3"></b-form-input>
      </b-form-group>
      <b-form-group id="stateInputGroup3" label="State 3" label-for="stateInput3">
        <b-form-input id="stateInput3" type="text" v-model="form.state_3__c" required placeholder="State 3"></b-form-input>
      </b-form-group>
      <b-form-group id="service_Area_InputGroup4" label="Service Area 4" label-for="service_Area_Input4">
        <b-form-input id="service_Area_Input4" type="text" v-model="form.service_Area_4__c" required placeholder="Service Area 4"></b-form-input>
      </b-form-group>
      <b-form-group id="stateInputGroup4" label="State 4" label-for="stateInput4">
        <b-form-input id="stateInput4" type="text" v-model="form.state_4__c" required placeholder="State 4"></b-form-input>
      </b-form-group>
      <b-form-group id="service_Area_InputGroup5" label="Service Area 5" label-for="service_Area_Input5">
        <b-form-input id="service_Area_Input5" type="text" v-model="form.service_Area_5__c" required placeholder="Service Area 5"></b-form-input>
      </b-form-group>
      <b-form-group id="stateInputGroup5" label="State 5" label-for="stateInput5">
        <b-form-input id="stateInput5" type="text" v-model="form.state_5__c" required placeholder="State 5"></b-form-input>
      </b-form-group>
      <b-form-group id="service_Area_InputGroup6" label="Service Area 6" label-for="service_Area_Input6">
        <b-form-input id="service_Area_Input6" type="text" v-model="form.service_Area_6__c" required placeholder="Service Area 6"></b-form-input>
      </b-form-group>
      <b-form-group id="stateInputGroup6" label="State 6" label-for="stateInput6">
        <b-form-input id="stateInput6" type="text" v-model="form.state_6__c" required placeholder="State 6"></b-form-input>
      </b-form-group>
      <b-form-group id="service_Area_InputGroup7" label="Service Area 7" label-for="service_Area_Input7">
        <b-form-input id="service_Area_Input7" type="text" v-model="form.service_Area_7__c" required placeholder="Service Area 7"></b-form-input>
      </b-form-group>
      <b-form-group id="stateInputGroup7" label="State 7" label-for="stateInput7">
        <b-form-input id="stateInput7" type="text" v-model="form.state_7__c" required placeholder="State 7"></b-form-input>
      </b-form-group>
      <b-form-group id="service_Area_InputGroup8" label="Service Area 8" label-for="service_Area_Input8">
        <b-form-input id="service_Area_Input8" type="text" v-model="form.service_Area_8__c" required placeholder="Service Area 8"></b-form-input>
      </b-form-group>
      <b-form-group id="stateInputGroup8" label="State 8" label-for="stateInput8">
        <b-form-input id="stateInput8" type="text" v-model="form.state_8__c" required placeholder="State 8"></b-form-input>
      </b-form-group>
      <b-form-group id="service_Area_InputGroup9" label="Service Area 9" label-for="service_Area_Input9">
        <b-form-input id="service_Area_Input9" type="text" v-model="form.service_Area_9__c" required placeholder="Service Area 9"></b-form-input>
      </b-form-group>
      <b-form-group id="stateInputGroup9" label="State 9" label-for="stateInput9">
        <b-form-input id="stateInput9" type="text" v-model="form.state_9__c" required placeholder="State 9"></b-form-input>
      </b-form-group>
      <b-form-group id="service_Area_InputGroup10" label="Service Area 10" label-for="service_Area_Input10">
        <b-form-input id="service_Area_Input10" type="text" v-model="form.service_Area_10__c" required placeholder="Service Area 10"></b-form-input>
      </b-form-group>
      <b-form-group id="stateInputGroup10" label="State 10" label-for="stateInput1">
        <b-form-input id="stateInput10" type="text" v-model="form.state_10__c" required placeholder="State 10"></b-form-input>
      </b-form-group>
      <b-form-group id="phoneInputGroup" label="Phone Number" label-for="phoneInput">
        <b-form-input id="phoneInput" type="tel" v-model="form.phone" required placeholder="Phone Number"></b-form-input>
      </b-form-group>
      <b-form-group id="agentNMLSInputGroup" label="Agent NMLS" label-for="agentNMLSInput">
        <b-form-input id="agentNMLSInput" type="text" v-model="form.agent_NMLS__c" required placeholder="Agent NMLS"></b-form-input>
      </b-form-group>
      <b-form-group id="companyNMLSInputGroup" label="Company NMLS License Number" label-for="companyNMLSInput">
        <b-form-input id="companyNMLSInput" type="text" v-model="form.company_NMLS_License_Number__c" required placeholder="Company NMLS License Number"></b-form-input>
      </b-form-group>
      <b-form-group id="zillowLenderInputGroup" label="Zillow Lender ID" label-for="zillowLenderInput">
        <b-form-input id="zillowLenderInput" type="text" v-model="form.zillow_Lender_Id" required placeholder="Zillow Lender ID"></b-form-input>
      </b-form-group>
      <b-form-group id="lTPartnerInputGroup1" label="LT Partner ID 1" label-for="lTPartnerInput">
        <b-form-input id="lTPartnerInput" type="text" v-model="form.lT_Partner_Id1" required placeholder="LT Partner ID 1"></b-form-input>
      </b-form-group>
      <b-form-group id="lTPartnerInputGroup2" label="LT Partner ID 2" label-for="lTPartnerInput2">
        <b-form-input id="lTPartnerInput2" type="text" v-model="form.lT_Partner_Id2" required placeholder="LT Partner ID 2"></b-form-input>
      </b-form-group>
      <b-form-group id="mortechIDInputGroup" label="Mortech ID" label-for="mortechIDInput">
        <b-form-input id="mortechIDInput" type="text" v-model="form.mortech_Id" required placeholder="Mortech ID"></b-form-input>
      </b-form-group>
      <b-button type="submit" class="float-right" :variant="theme">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  import Vue from "vue";
  import VueLocalStorage from "vue-localstorage";

	export default {
    data() {
		  return {
        theme: Vue.localStorage.get("theme"),
		    form: {
          guid:	"",
          userTypeID:	0,
          titleID: 0,
          userNumber:	"",
          name:	"",
          companyName: "",
          password:	"",
          mobile:	"",
          email:	"",
          idxUrl:	"",
          parentUserID:	0,
          isEmailVerified: false,
          profileImgName:	"",
          isActive:	false,
          isAdminApproved:	false,
          createdBy:	0,
          createdDate:	"",
          modifiedBy:	0,
          modifiedDate:	"",
          ipAddress:	"",
          address:	"",
          stateID:	"",
          cityID:	"",
          zipCode:	"",
          firstName:	"",
          lastName:	"",
          weightage:	0,
          partnerExternalId:	"",
          city:	"",
          state:	"",
          country:	"",
          fax:	"",
          website:	"",
          broker_License_Number__c:	"",
          privacy_Policy_Update__c:	"",
          external_Id__c:	"",
          billingStreet:	"",
          billingCity:	"",
          billingState:	"",
          billingPostalCode:	"",
          billingCountry:	"",
          description:	"",
          approved_By_SpriteRE__c: false,
          service_Areas__c:	"",
          states__c:	"",
          license_Number__c:	"",
          idX_URL__c:	"",
          profile_Image__c:	"",
          spriteRE_Username__c:	"",
          mailingStreet:	"",
          mailingCity:	"",
          mailingState:	"",
          mailingPostalCode:	"",
          mailingCountry:	"",
          service_Area_1__c:	"",
          state_1__c:	"",
          service_Area_2__c:	"",
          state_2__c:	"",
          service_Area_3__c:	"",
          state_3__c:	"",
          service_Area_4__c:	"",
          state_4__c:	"",
          service_Area_5__c:	"",
          state_5__c:	"",
          service_Area_6__c:	"",
          state_6__c:	"",
          service_Area_7__c:	"",
          state_7__c:	"",
          service_Area_8__c:	"",
          state_8__c:	"",
          service_Area_9__c:	"",
          state_9__c:	"",
          service_Area_10__c:	"",
          state_10__c:	"",
          phone:	"",
          agent_NMLS__c:	"",
          company_NMLS_License_Number__c:	"",
          zillow_Lender_Id:	"",
          lT_Partner_Id1:	"",
          lT_Partner_Id2:	"",
          mortech_Id:	""
        }
      }
    },
    created() {
      this.$bus.$on("theme-changed", $event => {
        this.updateTheme();
      });
    },
    methods: {
      updateTheme() {
        this.theme = Vue.localStorage.get("theme");
        console.log("updating theme to : " + this.theme);
      },
      onSubmit() {
        alert("I didn't try submitting this")
      }
    }
	}
</script>

<style scoped>

</style>
