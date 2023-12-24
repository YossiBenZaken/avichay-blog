const hebrewRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 מ ${length}`;
  }
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} מ ${length}`;
};

function getHebrewPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'הזמנות לעמוד:';
  paginatorIntl.nextPageLabel = 'עמוד הבא';
  paginatorIntl.previousPageLabel = 'עמוד קודם';
  paginatorIntl.getRangeLabel = hebrewRangeLabel;

  return paginatorIntl;
}

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  DxHtmlEditorModule,
  DxTagBoxModule,
  DxPieChartModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
@NgModule({
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    DxHtmlEditorModule,
    DxTagBoxModule,
    DxPieChartModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTemplateModule,
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    DxHtmlEditorModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getHebrewPaginatorIntl() },
  ],
})
export class MaterialModule {}
