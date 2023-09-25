import React from 'react';

// Define a type for layout props
type LayoutProps = {
  headerTitle: string;
  showSidebar: boolean;
  theme: string;
  // Add more layout props as needed
};

const LayoutHOC = (WrappedComponent: React.FC, layoutProps: LayoutProps) => {
  return class extends React.Component {
    render() {
      return (
        <div className={`app-layout ${layoutProps.theme}`}>
          {/* Header */}
          <header>
            <nav>
              <h1>{layoutProps.headerTitle}</h1>
              {/* Additional header content */}
            </nav>
          </header>

          {/* Sidebar (if needed) */}
          {layoutProps.showSidebar && (
            <aside>
              {/* Sidebar content */}
            </aside>
          )}

          {/* Main content */}
          <main>
            {/* WrappedComponent is the page component */}
            <WrappedComponent {...this.props} />
          </main>

          {/* Footer */}
          <footer>
            {/* Footer content */}
          </footer>
        </div>
      );
    }
  };
};

export default LayoutHOC;