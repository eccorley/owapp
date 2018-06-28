import React from "react";
import { Query } from "react-apollo";
import { NewsQuery } from "../graphql/queries";
import { format } from "date-fns";
import { dateFormat } from "../constants";

import { Feed, Image } from "semantic-ui-react";

export default class NewsFeed extends React.Component {
  render() {
    return (
      <Query query={NewsQuery}>
        {({ loading, data }) => {
          if (loading) return "Loading...";
          return (
            <Feed size="large">
              {data.news.blogs.map((blog, i) => {
                console.log(blog);
                return (
                  <Feed.Event key={i}>
                    <Feed.Content
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        maxHeight: 200,
                        padding: 18
                      }}
                    >
                      <div>
                        <Feed.Summary>
                          {blog.title}
                          <Feed.Date>
                            {format(blog.publish, dateFormat)}
                          </Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra text>{blog.summary}</Feed.Extra>
                      </div>
                      {blog.thumbnail && (
                        <Image
                          src={blog.thumbnail && blog.thumbnail.url}
                          size="medium"
                        />
                      )}
                    </Feed.Content>
                  </Feed.Event>
                );
              })}
            </Feed>
          );
        }}
      </Query>
    );
  }
}
