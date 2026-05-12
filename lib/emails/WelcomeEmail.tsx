import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  fullName: string;
  memberId: string;
  email: string;
  graduationYear?: string;
  batch?: string;
}

export const WelcomeEmail = ({
  fullName,
  memberId,
  email,
  graduationYear,
  batch,
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to BUPEXSA USA Alumni Association!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={heading}>Welcome to BUPEXSA USA!</Heading>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>Hello {fullName},</Text>
          <Text style={paragraph}>
            Welcome to the BUPEXSA USA Alumni Association family! Your registration has been successful.
          </Text>
          <Section style={detailsContainer}>
            <Text style={detailTitle}>Your Membership Details:</Text>
            <Text style={detailItem}><strong>Member ID:</strong> {memberId}</Text>
            <Text style={detailItem}><strong>Registered Email:</strong> {email}</Text>
            {graduationYear && <Text style={detailItem}><strong>Graduation Year:</strong> {graduationYear}</Text>}
            {batch && <Text style={detailItem}><strong>Batch:</strong> {batch}</Text>}
          </Section>
          <Text style={paragraph}>
            You can now log in to the member portal to access the directory, participate in events, and connect with fellow alumni.
          </Text>
          <Link href="https://bupexsausa.com/login" style={button}>
            Login to Portal
          </Link>
          <Text style={footer}>
            If you have any questions, feel free to reply to this email or contact our support team.
          </Text>
        </Section>
        <Text style={footerNote}>
          © 2024 BUPEXSA USA Alumni Association. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
};

const header = {
  padding: "32px",
  textAlign: "center" as const,
  backgroundColor: "#8B5CF6",
  borderRadius: "12px 12px 0 0",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0",
};

const content = {
  padding: "40px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
};

const detailsContainer = {
  backgroundColor: "#f9fafb",
  padding: "20px",
  borderRadius: "8px",
  margin: "24px 0",
};

const detailTitle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#8B5CF6",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "12px",
};

const detailItem = {
  fontSize: "14px",
  color: "#484848",
  margin: "4px 0",
};

const button = {
  backgroundColor: "#8B5CF6",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  marginTop: "24px",
};

const footer = {
  fontSize: "14px",
  color: "#8898aa",
  marginTop: "32px",
};

const footerNote = {
  fontSize: "12px",
  color: "#8898aa",
  textAlign: "center" as const,
  marginTop: "16px",
};
