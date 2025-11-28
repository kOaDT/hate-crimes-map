# Hate Crimes Map

![Hate Crimes Map](public/screen.png)

## Project Goal

The **Hate Crimes Map** project aims to visualize hate crime data to bring visibility to crimes that are often invisible or normalized by society. By making this data accessible and visual, we hope to contribute to a better understanding of these issues.

## Data Source

The data displayed in this project is sourced from the official ODIHR Hate Crime Reporting database, which can be accessed here: [https://hatecrime.osce.org/hate-crime-data](https://hatecrime.osce.org/hate-crime-data).

If you notice that the data is outdated, we invite you to contribute! Convert the `.xlsx` file from the source into a `.json` file and upload it to the following path in the repository: `/public/data/hcrw_incidents_all-report.json`.

## Caution

Please note that this data should be interpreted with caution. The data only includes participating OSCE member states and the number and nature of reported hate crimes can vary significantly between countries.

This project is not affiliated with the OSCE, the ODIHR or any other organization.

## Contributing Guidelines

We welcome contributions to improve this project! Here are some ways you can help:

1. **Update Data**: If the dataset is outdated, follow the instructions above to convert and upload the updated file.
2. **Report Issues**: Open an issue if you encounter bugs or have suggestions for improvement. Template to follow: [Issue Template](https://raw.githubusercontent.com/kOaDT/hate-crimes-map/refs/heads/develop/.github/ISSUE_TEMPLATE/bug_report.md).
3. **Feature Requests**: Suggest new features or enhancements to make the platform more impactful. Template to follow: [Feature Request Template](https://raw.githubusercontent.com/kOaDT/hate-crimes-map/refs/heads/develop/.github/ISSUE_TEMPLATE/feature_request.md).
4. **Pull Requests**: Feel free to fork the repository and submit your changes via pull requests. Ensure your code follows best practices and includes necessary documentation. Template to follow: [Pull Request Template](https://raw.githubusercontent.com/kOaDT/hate-crimes-map/refs/heads/develop/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md).

More information can be found in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

### Open-Source Licensing

This project is completely open-source. You are free to reuse, modify, or distribute the code.

More information can be found in the [LICENSE](LICENSE) file.

---

## How to Get Started

1. Clone the repository:
   ```bash
   git clone https://github.com/kOaDT/hate-crimes-map.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your Mapbox API key:
   - Create a `.env.local` file in the root directory.
   - Add the following line:
     ```
     NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_api_key
     ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Access the project at [http://localhost:3000](http://localhost:3000).

---
