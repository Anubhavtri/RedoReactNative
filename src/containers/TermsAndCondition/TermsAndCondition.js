import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import TermsAndConditionStyle from './TermsAndConditionStyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Linking,
    Pressable,
} from 'react-native';
import TextInput from '../../baseComponents/textInput/TextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {
    Path,
    G,
    Circle,
    Rect,
    text,
    Defs,
    ClipPath,
} from 'react-native-svg';

const exampleItems = [
    {
        title: 'Welcome to redcliffelabs.com',
        text: ' your smart diagnostic lab. Please read these Terms & Conditions carefully before you access any information and utilize Redcliffe Diagnostic Labs services. By agreeing to our Terms of Use, you acknowledge that you accept these terms & conditions and will abide by them. If you do not agree with our terms of use, you should stop accessing the information or using the services. The content available on this website is related to redcliffelabs.com and is the property of Redcliffe Lifetech Private Limited & Redcliffe Lifescience Private Limited with its registered office at H55 Electronic City, Noida, Uttar Pradesh, 201301. Redcliffelabs.com is India’s smart diagnostic test @home service provider that offers quality collection and testing services across its network of labs and a notable number of experienced phlebotomists.The website or the internet platform is referred to as Redcliffe Lifesciences or Redcliffe Labs or Redcliffe Life Diagnostics or Redcliffe Diagnostics and we refer to ourselves as “We”, “Us” Or “Our”. We control and manage the website on our own. We reserve all rights to make changes or amendments in our terms of use at any time without prior intimation by posting changes on www.redcliffelabs.com website. The users who agree to these Terms & Conditions of Redcliffe Labs are responsible for keeping a check on the information posted on the website and changes made in the terms of use.By using, browsing or in any way transacting on the website, or using any services, you indicate that you agree to be bound by these Terms & conditions mentioned herein. In addition, by impliedly or explicitly accepting our Terms & Conditions, you also agree to be bound by Redcliffe Labs’ policies, including the Privacy Policy, and such other rules, regulations, policies, terms of use as are applicable under the appropriate law(s) in India and other countries for the purposes of using, browsing or transacting on our website, or utilizing any of the services, and such rules, regulations, policies, terms of use shall be considered to be integrated into, and perceived as part and parcel of these Terms & Conditions. However, if users wish to move away from the website to a third party website, they may be subject to other terms and conditions of use and privacy policy, as may be provided on such a website. In such an event, the terms of use and privacy policy pertinent to that website will administer their use of that website'
    },
    {
        title: 'By using this website, you may agree and give consent to the following terms of use:',
        text: 'In case of non-acceptance with any pertinent conditions, rules or regulations, or the agreement by a website visitor, Redcliffe Labs has the right to instantly cease the access or usage rights of the User to the services and to eliminate unaccepted information.Redcliffe Labs may reveal or transfer perceptive personal data / information to the point where it is important to offer the services, to another entity or person, as mentioned in our Privacy Policy.Redcliffe Labs reserves the right at any time to refuse or suspend access to any or all segments of/services offered through the website to any user, who we believe, has disagreed with any of the conditions of these Terms of Use/Agreement.',
    },
    {
        title: 'ELIGIBILITY',
        text: 'By using the Website and/or availing the Services, users represent and warrant that they have the right, authority, and capacity to agree with the Company policies in respect of the Services being offered and to abide by all of the conditions set forth herein.You are responsible for all the transactions you make under your name or account. You are 18 years of age or over and have the legal rights to agree with the form of the binding contract in your jurisdiction.You signify and warrant to the Company that you will use the services in a manner dependable with all the pertinent rules and regulations.',
    },
    {
        title: 'Services and Terms of Use',
        text:   'To access some of the contents or services available on redcliffelabs.com website, users will need to create an account. For account creation, users are asked to fulfill the registration process by filling in the form the following details:Age,Name,Date Of Birth,Gender,Phone Number,Email Id,Address,By filling in your details, you agree that Redcliffe Labs will rely on the data you have provided and thus you hereby guarantee that any and all information provided by you in the process of account creation is reliable and accurate.Redcliffe Labs offers services through the Website to assist customers/ users to get reliable diagnostic tests with exclusive health diagnostic packages.The comprehensive health packages include a combination of customized diagnostic tests that the Company offers and customers/users are informed from time to time about the health packages by the information mentioned on the company website.These diagnostic health packages also include home service (if available, at the nearest testing centre), wherein customers/users are provided with the home sample collection service.When a user/customer places a request to avail test booking or E-Health Packages, a unique Order ID is generated in the name of the Customer.The Order ID and other details related to diagnostic services are sent to the customer’s on their registered email-Id and via SMS on their registered mobile number.Redcliffe Labs holds the right to make changes in the nature of services and offers mentioned in the E-Health packages. The changes will be notified to the users/ customers on the website.Users may not utilize the services for motives of examining their accessibility, performance or functionality, or for any other standardized or competitive purposes.The user is hereby given a restricted, non-exclusive, non-transferable right to use our services exclusively for user’s personal non-commercial use and in agreement with the permitted Terms & Conditions provided herein. Without restriction to the preceding, in the event the user is expelled from undertaking lawfully binding requirements under the Indian Contract Act, 1872, or are for any reason, unable to offer ‘Consent’ as per the Information Technology (Reasonable safety practices and methods and sensitive personal data or information) Rules, 2011, the user is not entitled to register for, use or utilize the services available on the Website.',
    },
    {
        title: 'Sample collection and Report Generation at Redcliffe Labs',
        text: 'Sample collection is scheduled based on the booking date of tests. Users can also reschedule the sample collection as per the available time and slot.Users may experience delay in a scheduled sample collection due to uncertainties, any ongoing pandemic restrictions, political issues and weather conditions etc. Any delay or cancellation will be timely informed to the user. Users need to keep a check on their messages and emails regularly for recent updates. Post sample collection, reports are usually generated within 24-48 hours from the time the sample is sent to the labs for examination, however some tests shall have longer processing times and shall be informed to the user at the time of sample booking / collection. In some cases, there are chances that users may experience delay in test results. Users hereby agree to bear the delay that they may have to experience.',
    },
    {
        title: 'Content',
        text: 'Redcliffe Life Diagnostics website may include third-party website links. Redcliffe Life Diagnostics should not be held responsible for images, videos or such contents posted on websites other than https://redcliffelabs.com/. Users should assess the applicable conditions or refer to the company’s Privacy Policy before using it. Redcliffe Life Diagnostics does not hold the responsibility of and does not intend to endorse any content, review, video, media publications, services or materials on or posted on third party sites. Users should access content or materials posted on third party websites at their own risk.Content or material submitted or published on other platforms or web pages should respect intellectual property rights. Redcliffe Life Diagnostics should be notified if the content located on or linked by the site violates the copyright. Redcliffe Life Diagnostics holds rights to delete or disable all links containing such content or materials. In the case of a user who may breach or repeatedly infringes upon the copyrights or other content of Redcliffe Life Diagnostics or others, Redcliffe Life Diagnostics may, in its choice, dismiss or deny access to and use of the Website and/or Services.',
    },
    {
        title: 'PC-PNDT Act',
        text: 'Redcliffe Life Diagnostics strongly agrees that pre-natal gender screening and pre-natal gender selection are illegal in India. It strongly follows the terms and conditions as mentioned in the PCPNDT Act. The Act strictly prohibits sex determination or disclosure of the gender of the fetus. Redcliffe Life Diagnostics supports the prohibition of any content, video, graphic representation and review associated with the prenatal determination of sex. The person who does not abide by the provisions of this Act is bookable with imprisonment and a fine. Redcliffe Life Diagnostics does not endorse or promote any publication of content (on website or media) or validate any technique or treatment pertaining to sex determination or gender selection. Patient reviews or testimonials are purely third-party content and Redcliffe Life Diagnostics cannot manage or control such activities. Through its website or webpage, Redcliffe Life Diagnostics by no means associates itself with any prohibited content.',
    },
    {
        title: 'Video Disclaimer',
        text: 'The views and opinions mentioned in the video content do not reflect or represent any endorsement by Redcliffe Life Diagnostics or its affiliates.The video content has been mentioned as a piece of information and awareness only. Redcliffe Life Diagnostics hereby does not promote viewers to conclude anything in terms of medical consultation, diagnosis, and treatment. Redcliffe Life Diagnostics strongly recommends its viewers or users take the right guidance or medical advice from their physician to make the best choice for their health.The medical advice or information on the site should be considered as an informative content and should not be used for a purpose of diagnosis or treatment without the intervention or recommendation of a certified medical practitioner.',
    },
    {
        title: 'Fee packages, Payments and Taxes',
        text: 'The User agrees to do all the payments in regards to consultation fees and other fees pertinent to User’s access to Services and the User shall not evade the fee structure. The fee is reliant on the Package that User buys and not on authentic usage of the Services.Each User / member is solely accountable for payment of all taxes, lawful compliances, and statutory registrations and reporting. Redcliffe Labs in no way can be held responsible for any of the taxes levied except for its own income tax.Users can pay the fees online through the facility available on the Redcliffe Labs Website. Redcliffe Labs is not responsible for any loss or damage caused to User during the process of making online payment as the third party payment merchants or apps are beyond the control of Redcliffe Labs. Users can also choose to pay the fees offline. All payments are exclusive of applicable taxes.Redcliffe Labs holds all the rights to alter the fee structure by updating the fee structure on the Website which one can consider as valid and agreed communication.In order to process the payments, Redcliffe Labs might need credentials of User’s bank account, credit or debit card number, etc.',
    },
    {
        title: 'Cancellation and Refund Policy',
        text: 'Redcliffe Labs holds all the rights to reschedule or cancel a test booking without any prior intimation to the users or patients. The time provided for consultation or performing tests is analytical and actual time for providing such services may get modified depending on the availability of the phlebotomists or field specialists. Users can also reschedule or cancel the bookings as per their convenience.In case of cancellation or non-confirmation of the booking by Redcliffe Labs due to any reason, the user/patient may contact Redcliffe Labs for rescheduling the booking within 15 (fifteen) days of cancellation and if user/customer fails to do so, the appointment with 15 (fifteen) days then such user/customer will not be allowed to get a refund or cancellation of the payment as may be made to Redcliffe Labs.Users will not be entitled to any refund after 15 (fifteen) days from the day they make the payment. However, in case Redcliffe Labs gets a written request for refund within 15 (fifteen) days, the total amount paid (without interest-subject to a deduction of INR 150/- (Indian Rupees One Hundred and Fifty) towards organizational charges) will be credited for any additional purchase of similar or amount greater than that within a maximum of 30 (thirty) days from date of cancellation.The confirmed amount due for refund shall be processed within 15 (fifteen) working days from the date of the cancellation, subject to all terms of use being met effectively. In case of payment made offline, the money will be transferred through Bank a/c IMPS, NEFT or Cheque.Redcliffe Labs shall not be responsible in any way for any hassle or loss caused to the user as a result of such rescheduling or cancellation of the booking. Further Redcliffe Labs reserves the right to reject service at any time without offering any reasons.',
    },
    {
        title: 'Indemnification',
        text: 'Users hereby agree to preserve, indemnify and hold the Company and keep the Company and its associates and each of their respective officers, clients, directors, employees, agents, or representatives harmless from and against all third party activities, proceedings, claims, liabilities (including legal liabilities), penalties, demands and pricing (including without limitation, permissible costs on a solicitor/attorney and own client basis), damages, losses and/or expenses however taking place out of or resulting from:Your use of the Website or the Services and violation of any of the Terms and Conditions by You; orany claim or proceeding brought in by a third party against the Company because of the Infringement by users of any intellectual property rights of that third party.',
    },
    {
        title: 'Confidentiality',
        text: 'For the Company’s Terms of Use, “Confidential Information” refers to all nonpublic data revealed by a Party or its employees, clients, or contractors (cooperatively, the “Disclosing Party”) to the other Party, its associates its employees, clients, or contractors (cooperatively, the “Receiving Party”) that is elected as confidential or that, provided the nature of the data or the circumstances surrounding its disclosure, practices should be referred to as confidential. Confidential Information includes concerning Company, nonpublic information associated with the Company’s technology, procedures, processes, customers, business proceedings and operating processes, promotional and marketing activities, finances, and other business events, etc. and about the users, the personal information disclosed by Users while booking and the information relating to User’s Account, username or password, and User’s test report(s).The Receiving Party will, always preserve, and cause its agents, clients, employees, contractors, and associates to preserve the confidentiality of all Confidential Information. The Receiving Party will acquire all reasonable measures to avoid revelation, distribution, or unauthorized use of Confidential Information by it or any third party. The Receiving Party will not use the Confidential Information of the Disclosing Party for any rationale whatsoever other than those purposes set forth herein.',
    },
    {
        title: 'Usage and Transfer of Personal Information',
        text: 'Redcliffe Labs website may include pages that provide users with the opportunity to provide us with Personal Information about themselves which shall be considered as per the Privacy Policy of Redcliffe Labs. Further users may agree to the following Terms of Use:Collection and Delivery are reliant on several practical and value parameters. Redcliffe Labs assumes no responsibility towards any time delay caused on account of the above factors essential for review, analysis reporting and third-party service delay outside of our control. Redcliffe Labs does not offer any medical advice and services offered must not be considered as an alternative for professional medical advice, diagnosis or treatment. Take proper guidance or medical advice from the professionals prior to booking a test for any medical condition. Please correlate clinically.Redcliffe Labs shall not be held liable in any manner for the genuineness of the personal information or sensitive personal data or information provided by the User to Redcliffe Labs or any other person acting on behalf of the company.The User is to be held liable for maintaining the privacy of their account access information and credentials and restricting any unlawful access and use of Services through the Redcliffe Labs website. The User shall be held responsible for all uses of the User’s credentials, whether or not approved by the User. The User shall instantly inform Redcliffe Labs of any actual or suspected unlawful use of the User’s account or password.If a User provides any information that is false, inaccurate, outdated or incomplete (or proves to be false, inaccurate, outdated or incomplete), or Redcliffe Labs has reasonable grounds to believe that such information is incomplete, Redcliffe Labs holds the right to suspend or terminate such account at its sole discretion.Users do hereby permit Redcliffe Labs and its associated members to collect the electronic copy of the report from our Diagnostic centre/ Labs and offer the same to the Users.',
    },
    {
        title: 'Modification of Terms of Service',
        text: 'Redcliffe Labs reserves all the rights to modify and update these Terms of Use and the Privacy Policy at any time without prior notice. As such, users are requested hereby to periodically evaluate these Terms of Use, our Privacy Policy, and any other guidelines that may be available on this Website, each of which are available through the Website homepage. Continual practice of our Services will be considered acceptance of any modifications. The User hereby agrees that, during the period of this Contract, we may alter or modify the Terms and Conditions, and amend the services offered under this Agreement. Any such modification or change will be requisite and useful instantly on release of the modified Agreement or change to the Service(s) on our website. Unless we explicitly inform otherwise, these terms integrate and replace any other terms related to the Services.Redcliffe Labs reserves all the rights to suspend service, or deny admittance to anyone who violates our policies or the terms and conditions mentioned herein, without prior notice or warning.',
    },
    {
        title: 'User consent',
        text:  "All Users / Patients herein referred as 'I/We' of the Website employing using/browsing the Website and in any manner reaching out to the Company either through a call or message or email or social channel / in person or through any other way hereby consent to the following.I/ We are inclined to opt for a diagnostic test of my own choice as required or as the case may be.I / We are aware that the 'Company' is providing diagnostic test services to assist us in getting sample collection, sample processing & reporting done in a timely manner from its network of certified labs either of it’s own or of any third party.I / We understand that the 'Company 'that includes its staff, representatives, employees etc., do not provide any medical opinion or counselling.I/we understand that the Company is not responsible for checking the need or genuinity of the prescription provided by us and is not responsible for the tests being prescribed in any manner.I / We understand that Pre Conception and Pre-Natal Diagnostic Technique for Sex Selection (Gender Selection) is prohibited in India and is a punishable offence. The Company being an Indian entity, does not aid, assist or support the same in any part of the world or in any way.I / We understand that we shall look at our own legal opinion/ guidance before opting for any particular services from the Company.I/ we understand that Company has zero-tolerance for unethical practices including but not limited to Gender Selection and any violation of the laws of the land, I/we shall be solely liable and responsible.I hereby authorize and give my consent to the Company to send me, either through itself or through any third party service provider, from time to time various information / sms / email / alerts / Whatsapp / notification / other messages or calls or commercial communication, and other services on my telephone or mobile numbers given by me to the Company whether these numbers are registered with National Do Not Call Registry / listed in National Customer Preference Register or not. I agree to receive Whatsapp or through any other medium any update from the Company and this shall act as an explicit consent for the same. I also confirm that by sending any of such messages / calls, I will not hold the Company and its third party service provider liable / institute compliant under the Telecom Commercial Communications Customer Preference (TRAI) Regulations,2010 or such other applicable regulation "
    },
    {
        title: 'Miscellaneous',
        text: 'Governing law and Dispute Resolution- The contract and Terms and Conditions shall be governed by and build in accordance with the lawful policies of India only without reference to disagreement of laws, standards and all disputes arising in connection hereto shall be subject to the restricted authority of the courts of New Delhi, India.Assignability - The Company may allocate any of its duties/obligations to any other Person without prior intimation to the User/Customer, at its sole discretion. However, you shall not allocate, sub-license or otherwise transmit any of your rights under this policy to the third party, unless a written permission is taken from the Company.Severability - If any provision of these Terms of Use is found to be unlawful, the invalidity of that provision will not impact the authority of the remaining provisions of the Terms and Conditions, which shall remain in full force and outcome.Waiver - Failure by the Company to work on any right or remedy under these Terms and Conditions does not comprise a waiver of that right or remedy.Force Majeure – Redcliffe Labs is not responsible for failure to perform any of its liabilities if such failure is as a result of Acts of God (for example; fire, flood, earthquake, storm, hurricane or other natural calamity), conflict, hostilities (regardless of whether war is declared), civil war, upheaval, revolt, insurrection, military or seized power or confiscation, terrorist activities and nationalization.Grievance Redressal: The Company shall attempt to deal with grievances or complaints of the Users/customers to the extent possible. Towards this the Company is dedicated to outline a Grievance Redressal Cell, which can be reached on the phone number as provided in the Website or may mail to care@redcliffelabs.com.',
    },
    {
        title: 'External Links',
        text: 'This Website may include hyperlinks to third party website(s) controlled by parties other than the Company. Such hyperlinks are provided for general reference only. The Company does not take control of third party website(s) and is not accountable for the content they choose to represent or publish. The Company’s inclusion of hyperlinks to third party website(s) does not involve any endorsement of the material on third party website(s) or any connection with their operators .The Company is not liable for any form of communication, whatsoever, received by You from any third party website(s) or for any errors, omissions, or demonstrations on any third part website(s). The Company does not approve any advertiser on any such website(s) in any way.',
    },
    {
        title: 'Communication with the Customers/Users',
        text: 'At Redcliffe Labs, we prioritize and value our customers’ privacy and security and thus we ensure the confidentiality of their data intact with us. By accepting our terms and policies, customers or users give Redcliffe Labs the consent to contact them with required information on our services via our telemarketing / telecalling services, which will be helpful for our users, even if their number is registered in NDNC ( National do not call registry) or DND (Do not disturb).Redcliffe Labs "Terms of Use" and "Privacy Policy" comprises a binding contract between Users and the Company, and is agreed by You upon your use of the redcliffelabs.com.',
    },
];

export const TermsCondition = props => {
    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.TopNav}>
                <MaterialCommunityIcons
                    onPress={e => {
                        props.navigation.goBack();
                    }}
                    style={{ fontSize: 25, marginRight: 10 }}
                    name="arrow-left"
                    backgroundColor="#3b5998"
                />
                <Text style={styles.topnavtext}>Terms and Conditions</Text>
            </View>
            <View style={[styles.Body, styles.paddingClass]}>
                {/*  <ScrollView>
          <View style={styles.first}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require('../../staticData/assests/help.png')}
            />
            <View style={styles.info}>
              <Text style={styles.heading}>We're here to help!</Text>
              <Text style={styles.infotext}>
                If you have any queries related to any of our tests or packages,
                you can contact us on the below mentioned phone number or email.
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoheading}>Call</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:08988988787`);
                }}>
                <Text style={styles.contactinfo}>898 898 8787</Text>
              </TouchableOpacity>
              <Text style={styles.infoheading}>Email</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('mailto:care@redcliffelabs.com');
                }}>
                <Text style={styles.contactinfo}>care@redcliffelabs.com </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView> */}
                <View style={[styles.Body]}>
                    <ScrollView>
                        <View style={[styles.BodyComponentSecond]}>
                            <View style={[styles.Bodyformbox]}>
                                <Text style={styles.subheading}>REDCLIFFE LABS TERMS OF USE</Text>
                                {exampleItems.map((item) => {
                                    return (
                                        <View style={styles.qncard}>
                                            <Text style={styles.q}>
                                                {item.title}
                                            </Text>
                                            <Text style={styles.a}>
                                            {item.text}
                                            </Text>
                                        </View>
                                    )
                                })}

                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};
let styles = create(TermsAndConditionStyle);

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TermsCondition);
