import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Calculator from "../components/Calculator";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";

const CalculatorPage = props => {
  const {
    data: {
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="Rent Savings Calculator" theme={theme} />
            </header>
            <Calculator theme={theme} />
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

CalculatorPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default CalculatorPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query RentSavingsCalculatorQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
